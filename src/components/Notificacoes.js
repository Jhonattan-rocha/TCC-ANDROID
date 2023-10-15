import React from "react";
import notifee, {
    AuthorizationStatus,
    EventType,
    AndroidImportance
  } from '@notifee/react-native';
import { View } from "react-native";

export default function Notificacao({ title, body, channelId, name, pressActionId }) {
    const [statusNotification, setStatusNotification] = React.useState(false);

    React.useEffect(() => {
        async function getPermission() {
            const settings = await notifee.requestPermission();
            if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
                console.log("Permitiu");
                setStatusNotification(true);
            } else {
                setStatusNotification(false);
                console.log("Não permitiu");
            }
        }

        getPermission();
    }, []);

    React.useLayoutEffect(() => {
        handleMessage();

        return notifee.onForegroundEvent(({ type, detail }) => {
            switch (type) {
                case EventType.DISMISSED: {
                    console.log("Usuário descartou a notificação");
                    break;
                }
                case EventType.PRESS: {
                    console.log("Tocou: ", detail.notification);
                    break;
                }
            }
        });
    }, []);

    async function handleMessage() {
        if (!statusNotification) {
            return;
        }

        const channelID = await notifee.createChannel({
            id: channelId,
            name: name,
            vibration: true,
            importance: AndroidImportance.HIGH,
        });

        await notifee.displayNotification({
            id: channelID,
            title: title,
            body: body,
            android: {
                channelId: channelID,
                pressAction: {
                    id: pressActionId,
                },
            },
        });
    }

    // No return statement or an empty JSX fragment here
    return (
        <View></View>
    );
}