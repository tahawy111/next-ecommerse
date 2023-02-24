import { useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

const Product = () => {
  const toast = useRef<Toast>(null);

  const showToast = () => {
    toast.current?.show({
      severity: "info",
      summary: "Info",
      detail: "Message Content",
    });
  };
  return (
    <div>
      <p className="text-4xl font-extrabold">Product</p>
      <Toast ref={toast} position="bottom-right" />
      <Button onClick={showToast} label="Show" />
    </div>
  );
};

export default Product;
