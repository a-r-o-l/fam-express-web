import { Bus, Smartphone, Waypoints } from "lucide-react";

export const RenderIcon = ({name}) => {
    switch (name) {
      case "sirve":
        return <Bus className="h-4 w-4 text-muted-foreground"/>;
        break;
      case "claro":
        return <Smartphone className="h-4 w-4 text-muted-foreground"/>;
        break;
      default:
        return <Waypoints className="h-4 w-4 text-muted-foreground"/>;
    }
  };