/* eslint-disable radix */
import React from "react";

// Libraries
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Icons({ collection, icon, color, size = 12 }) {
  const colorDefault = "black";
  switch (collection) {
    case "AntDesign":
      return (
        <AntDesign
          name={icon}
          style={{ color: color || colorDefault }}
          size={parseInt(size)}
        />
      );

    case "Feather":
      return (
        <Feather
          name={icon}
          style={{ color: color || colorDefault }}
          size={parseInt(size)}
        />
      );

    case "Fontisto":
      return (
        <Fontisto
          name={icon}
          style={{ color: color || colorDefault }}
          size={parseInt(size)}
        />
      );

    case "MaterialCommunityIcons":
      return (
        <MaterialCommunityIcons
          name={icon}
          style={{ color: color || colorDefault }}
          size={parseInt(size)}
        />
      );

    case "MaterialIcons":
      return (
        <MaterialIcons
          name={icon}
          style={{ color: color || colorDefault }}
          size={parseInt(size)}
        />
      );

    case "EvilIcons":
      return (
        <EvilIcons
          name={icon}
          style={{ color: color || colorDefault }}
          size={parseInt(size)}
        />
      );

    case "SimpleLineIcons":
      return (
        <SimpleLineIcons
          name={icon}
          style={{ color: color || colorDefault }}
          size={parseInt(size)}
        />
      );

    case "FontAwesome5":
      return (
        <FontAwesome5
          name={icon}
          style={{ color: color || colorDefault }}
          size={parseInt(size)}
        />
      );

    case "Entypo":
      return (
        <Entypo
          name={icon}
          style={{ color: color || colorDefault }}
          size={parseInt(size)}
        />
      );

    case "Ionicons":
      return (
        <Ionicons
          name={icon}
          style={{ color: color || colorDefault }}
          size={parseInt(size)}
        />
      );

    default:
      return (
        <FontAwesome
          name={icon}
          style={{ color: color || colorDefault }}
          size={parseInt(size)}
        />
      );
  }
}
