import { updateConfirm } from "../../../../infrastructure/repositories/company/orderRepositories";

export const updateConfirmService = async (confirmedIds: number[]) => {
  await updateConfirm(confirmedIds);
};
