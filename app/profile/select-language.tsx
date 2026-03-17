import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import I18n, { setLanguage } from "../../i18n";

export default function SelectLanguage() {
    const router = useRouter();

    const selectLang = (lang: string) => {
        setLanguage(lang);
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => selectLang("en")}>
                <Text style={styles.item}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => selectLang("fr")}>
                <Text style={styles.item}>Français</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    item: { fontSize: 18, margin: 12 },
});
