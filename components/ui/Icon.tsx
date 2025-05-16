// components/ui/Icon.tsx
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

type IconSet = "feather" | "material" | "fontawesome" | "ionicons";
type IconName = string;

const ICON_SETS = {
  feather: Feather,
  material: MaterialIcons,
  fontawesome: FontAwesome,
  ionicons: Ionicons,
} as const;

export default function Icon({
  name,
  set = "feather",
  size = 24,
  color = "black",
}: {
  name: IconName;
  set?: IconSet;
  size?: number;
  color?: string;
}) {
  const IconComponent = ICON_SETS[set];

  if (!IconComponent) {
    console.warn(`Invalid icon set: ${set}`);
    return null;
  }

  return <IconComponent name={name as any} size={size} color={color} />;
}
