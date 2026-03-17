import { Switch, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Moon } from "lucide-react-native";
import { useTheme } from "../components/ui/ThemeProvider";

export default function DarkModeItem() {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <View style={[styles.row, { backgroundColor: colors.surface }]}>
      <Moon size={20} color={colors.primary} />
      <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
      <Switch
        value={theme === "dark"}
        onValueChange={toggleTheme}
        thumbColor={theme === "dark" ? colors.primary : "#fff"}
        trackColor={{ true: colors.primary + "55", false: "#888" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    marginVertical: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
    flex: 1,
  },
});