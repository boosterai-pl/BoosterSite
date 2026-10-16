// Order of this list = order of the cards on the home page (numbered 01, 02, ...).
import type { ServiceEntry } from "../types";
import { aiAutomation } from "./ai-automation";
import { b2bSoftware } from "./b2b-software";
import { crmImplementation } from "./crm-implementation";
import { openSourceErp } from "./open-source-erp";

export const services: readonly ServiceEntry[] = [aiAutomation, b2bSoftware, crmImplementation, openSourceErp];
