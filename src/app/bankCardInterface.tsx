export interface BankObj {
  coords: number[];
  id: number;
  type: string;
  name: string;
  phone: string | null;
  address: string;
  is_main_office: number;
  metro_name: string | null;
  private_person: string | null;
  legal_person: string | null;
  vip_person: string | null;
  bank_site: string;
  banking_window: number;
  number_person_now: number;
}
