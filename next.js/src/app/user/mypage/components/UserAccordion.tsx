import { UserProductCustomization } from "@/types/user";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

import { UserProductCustomizationList } from "./UserProductCustomizationList";

type Props = {
  customization: UserProductCustomization[];
};

export const UserAccordion = ({ customization }: Props) => {
  return (
    <Accordion sx={{ mt: 3, bgcolor: "#e8f5e9" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ fontWeight: "bold" }}>カスタマイズ品一覧</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <UserProductCustomizationList customization={customization} />
      </AccordionDetails>
    </Accordion>
  );
};
