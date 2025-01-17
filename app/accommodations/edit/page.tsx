import { AddEdit } from "@/src/components/accommodations/AddEdit";
import accommodationsData from "@/src/data/accommodations.json";

export default function Edit() {
  return <AddEdit accommodation={accommodationsData.accommodations[0]} />;
}
