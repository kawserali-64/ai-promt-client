'use client'

import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";

const BackButton = ({}) => {
    return (
         <Button
          onClick={() => window.history.go(-2)}
          className="mt-6 inline-flex items-center justify-center gap-2 w-full rounded-lg bg-emerald-600 py-2.5 text-white font-medium hover:bg-emerald-700 transition"
        >
          Go Back
          <ArrowRight className="w-4 h-4" />
        </Button>
    );
};

export default BackButton;