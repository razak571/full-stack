import { Switch } from "@headlessui/react";
import { useState } from "react";

const Toggle = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
    >
      <span
        aria-hidden="true"
        className="size-4 translate-x-1 rounded-full bg-teal-400 group-data-[checked]:bg-white transition group-data-[checked]:translate-x-6"
      />
    </Switch>
  );
};
export default Toggle;
