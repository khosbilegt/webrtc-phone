import { ActionIcon, Card, Flex, Input, Stack, Text } from "@mantine/core";
import { useContext, useEffect, useRef, useState } from "react";
import { notifications } from "@mantine/notifications";
import JsSIP from "jssip";
import SIPContext from "../app/SipContext";
import Keyboard from "../components/Keyboard";
import { IconRefresh } from "@tabler/icons-react";
import { CallStage } from "../types/sip";
import { PeerConnectionEvent } from "jssip/lib/RTCSession";

function CallView() {
  const [target, setTarget] = useState("");
  const [bearerToken, setBearerToken] = useState("");
  const {
    sipPhoneRef,
    sipClientStatus,
    setSIPClientStatus,
    sipCallStageRef,
    sipCallSessionRef,
  } = useContext(SIPContext);
  const remoteAudio = useRef<HTMLMediaElement | null>(null);

  const attemptConnection = (webrtcConfig: any) => {
    try {
      const webrtcServer = webrtcConfig?.webrtcServer;
      const username = webrtcConfig?.username;
      const password = webrtcConfig?.password;
      const socket = new JsSIP.WebSocketInterface(webrtcServer, [bearerToken]);
      const configURI = `sip:${username}`;
      const configuration = {
        sockets: [socket],
        uri: configURI,
        password: password,
        trace_sip: true,
        connection_recovery_min_interval: 10000,
      };
      const phone = new JsSIP.UA(configuration);

      phone.on("registered", () => {
        notifications.show({
          title: "Connection Successful",
          message: "SIP connection successful",
        });
        setSIPClientStatus({
          isConnected: true,
        });
      });

      phone.on("disconnected", () => {
        notifications.show({
          title: "Connection Lost",
          message: "SIP connection lost",
          color: "red",
        });
        setSIPClientStatus({
          isConnected: false,
        });
      });

      phone.on("newRTCSession", (data: any) => {
        if (sipCallStageRef.current === CallStage.IN_CALL) {
          // const { session } = data;
          // session.terminate();
        } else {
          const { session } = data;
          sipCallSessionRef.current = session;
          if (session.direction === "incoming") {
            // setCallStatus((prevStatus) => ({
            //   ...prevStatus,
            //   stage: CallStage.INCOMING,
            //   callerId: session._remote_identity._uri?._user,
            // }));
            sipCallStageRef.current = CallStage.INCOMING;
            try {
              console.log("Дуудлага ирлээ");
              // incomingAudio.src = callingAudio;
              // incomingAudio.loop = true;
              // incomingAudio.play();
            } catch (error) {
              // message.error("Хэрэглэгчийн аудио тоглуулахад алдаа гарлаа");
              console.error("Incoming audio тоглуулж чадсангүй:");
            }
          }
          session.on("peerconnection", function (data: PeerConnectionEvent) {
            data.peerconnection.addEventListener(
              "addstream",
              function (e: any) {
                if (remoteAudio.current) {
                  remoteAudio.current.srcObject = e.stream;
                  remoteAudio.current.play();
                  console.log("Audio-г амжилттай холболоо");
                } else {
                  notifications.show({
                    title: "Audio Error",
                    message: "Failed to connect audio",
                    color: "red",
                  });
                  console.error("Failed to connect audio");
                }
              }
            );
          });
          session.on("accepted", () => {
            console.log("Accepted call");
            sipCallStageRef.current = CallStage.IN_CALL;
          });

          session.on("ended", () => {
            sipCallSessionRef.current = null;
            sipCallStageRef.current = CallStage.ENDED;
            // messageApi.warning("Дуудлага тасарлаа");
          });

          session.on("failed", (data: any) => {
            const type = data?.cause;
            const errorMessage = type;
            console.log("HERE");
            console.log(data);
            console.log("Failed to connect call", errorMessage);
            notifications.show({
              title: "Call Error",
              message: `Failed to connect call: ${errorMessage} ${data?.cause}`,
              color: "red",
            });
            sipCallSessionRef.current = null;

            sipCallStageRef.current = CallStage.IDLE;
          });
        }
      });

      phone.start();
      sipPhoneRef.current = phone;
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Connection Error",
        message: "Error connecting to SIP server",
        color: "red",
      });
    }
  };

  const makeCall = () => {
    console.log("Clicked");
    const number = target;
    const destination = `sip:${number}@10.10.6.106`;
    const options = {
      mediaConstraints: {
        audio: true,
        video: false,
      },
      // ...(fromNumberId && { fromDisplayName: fromNumberId }),
    };
    if (sipPhoneRef.current != null) {
      const session = sipPhoneRef.current.call(destination, options);
      sipCallSessionRef.current = session;
    } else {
      notifications.show({
        title: "Connection Error",
        message: "SIP connection not established",
        color: "red",
      });
    }
  };

  useEffect(() => {
    const webrtcConfig = localStorage.getItem("webrtc_config");
    if (webrtcConfig) {
      attemptConnection(JSON.parse(webrtcConfig));
    }
  }, []);

  return (
    <Card maw={400}>
      <Stack align="center">
        <Flex gap={10}>
          <audio ref={remoteAudio} />
          <Text>
            Connection Status:{" "}
            {sipClientStatus.isConnected ? "CONNECTED" : "DISCONNECTED"}{" "}
          </Text>
          <ActionIcon
            onClick={() => {
              const config = localStorage.getItem("webrtc_config");
              if (config) {
                attemptConnection(JSON.parse(config));
              }
            }}
          >
            <IconRefresh />
          </ActionIcon>
        </Flex>
        <Input
          size="xl"
          placeholder="Enter call destination"
          value={target}
          onChange={(e) => {
            setTarget(e.currentTarget.value);
          }}
        />
        <Input
          size="xl"
          placeholder="Bearer Token"
          value={bearerToken}
          onChange={(e) => {
            setBearerToken(e.currentTarget.value);
          }}
        />
        <Keyboard
          buttonClick={(value: string) => {
            setTarget((prevTarget) => {
              return prevTarget + value;
            });
          }}
          callClick={() => {
            makeCall();
          }}
        />
      </Stack>
    </Card>
  );
}

export default CallView;
