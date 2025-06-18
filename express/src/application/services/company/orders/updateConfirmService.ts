import { updateConfirm } from "../../../../infrastructure/repositories/company/orderRepositories.js";

export const updateConfirmService = async (confirmedIds: number[]) => {
  await updateConfirm(confirmedIds);
};
