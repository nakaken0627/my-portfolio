import { ProductWithCustomization } from "@/types/company";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";

import { ModalDefaultInfo } from "./ModalDefaultInfo";
import { ModalForm } from "./ModalForm";
import { ModalTable } from "./ModalTable";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  productWithCustoms?: ProductWithCustomization;
};

export const ProductsDetailModal = ({
  open,
  onClose,
  productWithCustoms,
}: ModalProps) => {
  if (!productWithCustoms) return;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ fontWeight: "bold", backgroundColor: "#e3f2fd" }}>
        商品詳細
      </DialogTitle>

      <DialogContent dividers sx={{ backgroundColor: "#fafafa" }}>
        <ModalDefaultInfo product={productWithCustoms} />
        <Divider sx={{ my: 2 }} />
        <ModalForm />
        <Divider sx={{ my: 2 }} />
        <ModalTable customs={productWithCustoms.custom} />
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ fontWeight: "bold" }}
        >
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};
