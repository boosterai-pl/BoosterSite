# Ścieżki klienta i konfiguracja Datafast

Cel strony: **wysłanie formularza kontaktowego** na `/pl/book` albo `/en/book`.
Każdy przycisk prowadzący do formularza ma w adresie `?z=<id przycisku>`, więc wiadomo, skąd przyszło zgłoszenie.
To samo `id` trafia do Datafast (cel `cta_click`, parametr `button`), do zgłoszenia w ClickUp (pole „Źródło”) i do celów formularza (parametr `source`).

## 1. Wejścia na stronę

| Wejście | Gdzie ląduje | Uwagi |
| --- | --- | --- |
| Wyszukiwarka, wpisany adres, polecenie | `/pl` albo `/en` (wejście na `/` wybiera język wg przeglądarki) | Główna ścieżka. |
| Kampanie PL / zagraniczne | prosto na `/pl/book` lub `/en/book` z UTM-ami | Bez przekierowań. UTM-y zostają po przełączeniu języka. |
| Podstrony usług (z Google lub ze stopki) | `/pl/practices/<usługa>` | Cztery usługi, każda ma dwa przyciski do formularza. |
| Realizacje → LegalFlow | `/pl/work/legalflow` | Z menu „Realizacje” albo z karty LegalFlow. |
| Kariera, blog | `/pl/careers`, `/pl/blog` | Nie sprzedażowe. Przycisk w menu nadal prowadzi do formularza. |
| Stara subdomena `restrukturyzacja.boosterai.pl` | przekierowanie na legal-flow.pl | Z UTM-em `restrukturyzacja-subdomain`. |

## 2. Ścieżki do formularza

**A. Strona główna, szybka decyzja.** Hero → „Umów bezpłatną rozmowę” (`z=hero`) albo przycisk w menu (`z=nav`) → formularz → wysłanie.

**B. Strona główna, czytanie.** Hero → „Poznajesz to?” → trzy etapy → pasek „Nie wiesz, od czego zacząć?” (`z=strip-stages`) → Realizacje → pasek „Chcesz podobnych efektów?” (`z=strip-cases`) → Open Mercato → Jak pracujemy → pasek z planem (`z=strip-process`) → Twoje dane → pasek o bezpieczeństwie (`z=strip-data`) → Kiedy nie jesteśmy dla Ciebie → Zespół → Usługi → FAQ → blok końcowy (`z=cta`).
Każda sekcja ma cel przewijania (`scroll_to_...`), więc widać, gdzie ludzie odpadają.

**C. Realizacje.** Karta „Opcje na salach” → „Porozmawiajmy o Twoim procesie” (`z=usecase-eventy`, w EN `z=usecase-events`).

**D. LegalFlow.** Karta LegalFlow albo menu → `/work/legalflow` → „Umów bezpłatną rozmowę” (`z=legalflow`).
Odgałęzienie: wyjście na legal-flow.pl (cel `legalflow_click`) albo telefon na linię demo asystentki (`phone_click`).

**E. Podstrony usług.** `/practices/<usługa>` → przycisk w hero (`z=<usługa>-hero`) albo pod treścią (`z=<usługa>-sekcja`).
Usługi: `ai-automation`, `open-source-erp`, `crm-implementation`, `b2b-software`.

**F. Kampania.** Reklama → `/pl/book?utm_...` → formularz → wysłanie. Źródło widać z UTM-ów. Bez `z` cele formularza mają `source=direct`.

**G. Inne kontakty (poza formularzem).** Mail ze stopki (`email_click`), kalendarz na `/book` (`calendar_click`).

## 3. Cele w Datafast

Cele pojawiają się w Datafast same po pierwszym wywołaniu. Nie trzeba ich zakładać ręcznie.

| Cel | Kiedy | Parametry |
| --- | --- | --- |
| `form_success` | **formularz wysłany, zgłoszenie przyjęte (konwersja)** | `source` (id przycisku albo `direct`), `lang` |
| `form_start` | pierwsze wpisanie czegoś w formularz | `source`, `lang` |
| `form_error` | wysyłka się nie udała (pokazujemy wtedy link do maila) | `source`, `lang` |
| `cta_click` | klik w przycisk prowadzący do formularza | `button` (id z `?z=`), `page` |
| `legalflow_click` | klik w link do legal-flow.pl | `placement` (miejsce na stronie), `page` |
| `phone_click` | klik w numer telefonu | `page` |
| `email_click` | klik w adres e-mail | `page` |
| `calendar_click` | klik w link do kalendarza na `/book` | `page` |
| `scroll_to_<sekcja>` | sekcja strony głównej pojawia się na ekranie (raz na wizytę) | — |

Sekcje strony głównej dla `scroll_to_`: `pain`, `stages`, `work`, `foundation`, `process`, `data`, `not_for`, `team`, `faq`, `contact`.

## 4. Lejki do założenia w Datafast

Na dole panelu Datafast: **„+ Funnel”**.

1. **Formularz (najważniejszy)**
   - Krok 1, odwiedzona strona: URL zawiera `/book`
   - Krok 2, cel: `form_start`
   - Krok 3, cel: `form_success`
2. **Strona główna → zgłoszenie**
   - Krok 1, odwiedzona strona: URL równa się `/pl` (osobny lejek dla `/en`)
   - Krok 2, cel: `cta_click`
   - Krok 3, cel: `form_start`
   - Krok 4, cel: `form_success`
3. **Przewijanie strony głównej**
   - Krok 1, odwiedzona strona: `/pl`
   - Kolejne kroki, cele: `scroll_to_pain` → `scroll_to_stages` → `scroll_to_work` → `scroll_to_process` → `scroll_to_data` → `scroll_to_team` → `scroll_to_contact`
4. **LegalFlow → zgłoszenie**
   - Krok 1, odwiedzona strona: URL zawiera `/work/legalflow`
   - Krok 2, cel: `cta_click`
   - Krok 3, cel: `form_success`

Filtry w lejku (źródło, kraj, urządzenie) pokażą, które kampanie prowadzą do wysłanych formularzy.

## 5. Ruch na legal-flow.pl

Każdy link do legal-flow.pl ma UTM-y:
`utm_source=boosterai.pl`, `utm_medium=referral`, `utm_campaign=<miejsce>`, `utm_content=pl|en`.
Linki do legal-flow.pl nie mają też `noreferrer`, więc przeglądarka przekazuje adres boosterai.pl jako źródło.

| `utm_campaign` | Miejsce |
| --- | --- |
| `home-case-platform` | strona główna, karta LegalFlow, kafelek platformy |
| `home-case-assistant` | strona główna, karta LegalFlow, kafelek asystentki |
| `work-legalflow-hero` | `/work/legalflow`, przycisk w nagłówku |
| `work-legalflow-gallery-platform` | `/work/legalflow`, zrzut platformy |
| `work-legalflow-gallery-assistant` | `/work/legalflow`, zrzut asystentki |
| `work-legalflow-callout` | `/work/legalflow`, blok z numerem demo |
| `restrukturyzacja-subdomain` | przekierowanie ze starej subdomeny |

W Datafast dla legal-flow.pl ten ruch jest w źródłach jako `boosterai.pl`, a szczegóły w zakładce kampanii (UTM).
Nowy link do legal-flow.pl w treści: używaj `legalFlowHref(ścieżka, miejsce, język)` z `src/content/links.ts`.
