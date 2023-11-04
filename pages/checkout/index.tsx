import { ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Checkout() {
  const [step, setStep] = useState("info");
  return (
    <main>
      <div className="text-muted m-2 flex items-center justify-center text-xs">
        <div
          className={` ${step === "info" && "text-accent"} flex items-center`}
        >
          <div className="uppercase">Info</div>
          <ChevronRight strokeWidth={1} width={16} />
        </div>
        <div
          className={` ${
            step === "shipping" && "text-accent"
          } flex items-center`}
        >
          <div className="uppercase">Shipping</div>
          <ChevronRight strokeWidth={1} width={16} />
        </div>
        <div
          className={` ${
            step === "payment" && "text-accent"
          } flex items-center uppercase`}
        >
          Payment
        </div>
      </div>
    </main>
  );
}
