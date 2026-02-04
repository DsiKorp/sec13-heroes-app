import { heroApi } from "../api/hero.api"
import type { SumaryInformationResponse } from "../types/summary-information.response";

export const getSummaryAction = async () => {

    const { data } = await heroApi.get<SumaryInformationResponse>('/summary');

    return data;
}