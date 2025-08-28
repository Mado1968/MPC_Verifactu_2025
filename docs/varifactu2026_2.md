# La Generació de la Factura Electrònica Vàlida sota Verifactu: Requisits i Procés

La Llei Verifactu és una reforma legal impulsada a Espanya, part de la Llei Antifrau (Llei 11/2021) i desenvolupada pel Reial Decret 1007/2023, amb l'objectiu principal de **modernitzar la facturació, combatre l'evasió fiscal i digitalitzar els processos administratius**. El seu propòsit és garantir la **integritat, inalterabilitat i traçabilitat** de tota factura emesa i lluitar contra el frau, especialment el derivat del "software de doble ús". Aquesta normativa s'aplicarà de manera obligatòria a empreses a partir de l'1 de gener de 2026 i a autònoms a partir de l'1 de juliol de 2026.

## 1. Com Generar la Factura Electrònica Vàlida per a Verifactu

Per generar una factura electrònica vàlida sota el sistema Verifactu, és imprescindible complir amb una sèrie de requisits fonamentals que transformen radicalment el procés de facturació:

*   **Ús Obligatori de Programari Certificat i Homologat**:
    *   S'acaba l'era de les **factures manuals** fetes en Word, Excel o documents PDF "fets a mà".
    *   Només es podran utilitzar **programes de facturació que compleixin els estàndards tècnics i de seguretat definits per l'Agència Tributària (AEAT)**. Aquest programari haurà d'estar homologat i certificat per l'AEAT.
    *   Els desenvolupadors de programari han de **certificar sota una declaració responsable** que el seu programari compleix la normativa.

*   **Incorporació d'Elements de Verificació i Control**: Totes les factures han d'incloure elements específics per reforçar el control i la transparència:
    *   **Codi QR Únic**: Totes les factures han d'incloure un **codi QR únic** que estigui vinculat a l'AEAT i que permeti a qualsevol receptor **comprovar la validesa fiscal de la factura** mitjançant l'aplicació oficial de l'AEAT.
    *   **Llegenda Identificativa**: Les factures que s'enviïn directament a l'AEAT a través de la modalitat Verifactu hauran de portar una frase com **"Factura verificable en la sede electrónica de la AEAT" o "VERIFACTU"**.
    *   **Empremta Digital (Hash) i Firma Electrònica**: Cada factura ha de contenir una **empremta digital (hash)** que permeti l'encadenament i impedeixi la manipulació. Aquest "hash encadenat" lliga digitalment totes les operacions de facturació per impedir fraus. El programari ha de suportar la **firma electrònica i l'encadenament criptogràfic (hash)** de les factures, reforçant la seguretat i la traçabilitat digital. En la modalitat Verifactu, la validesa la dona el propi sistema i l'AEAT.

*   **Format Electrònic Estructurat**: Les factures han d'emetre's en **formats llegibles i universals** com **XML o JSON**, garantint la interoperabilitat i el compliment tècnic.

## 2. Requisits Tècnics i Informàtics per a la Generació i Enviament

Els requisits tècnics i informàtics per al programari de facturació sota Verifactu són estrictes i se centren en l'automatització, la seguretat i la inalterabilitat de les dades:

*   **Programari Homologat i Certificat**: El sistema ha de ser un **programari de facturació homologat i certificat per l'AEAT**.
*   **Generació Automàtica de Registre**: El programari ha de generar automàticament el **registre de facturació en el moment de l'emissió**, amb un segell temporal o firma electrònica que garanteixi la inalterabilitat i autenticitat de la factura emesa.
*   **Enviament Automàtic i Immediat a Hisenda (Modalitat Verifactu)**: Si l'usuari tria la modalitat Verifactu, cada factura s'envia **automàticament i de forma immediata a l'AEAT** després de ser creada, assegurant la inalterabilitat i traçabilitat del procés.
*   **Impossibilitat de Modificació un cop Emesa**: Un cop registrada i enviada, **no és possible ocultar, alterar o eliminar factures del sistema**, la qual cosa assegura la integritat de les dades fiscalment rellevants.
*   **Seguretat Reforçada (Hash i Firma Electrònica)**: Totes les operacions de facturació queden lligades digitalment per impedir fraus. El programari ha de suportar la **firma electrònica i l'encadenament criptogràfic (hash)**.
*   **Registres Detallats d'Esdeveniments**: El sistema ha d'incorporar **registres detallats d'esdeveniments o interaccions** amb el sistema de facturació, generant un historial que dona suport a auditories i controls fiscals. Això inclou un control exhaustiu d'esdeveniments com la creació, modificació o errors.
*   **Resposta Automàtica de Validació**: Després de l'emissió i l'enviament, el sistema ha de proporcionar una **resposta automàtica de validació**, informant si la factura és acceptada o si presenta errors que s'han de corregir.
*   **Centralització de la Informació**: No serà necessari mantenir un llibre de registre de factures emeses manualment, ja que la informació estarà **disponible a la seu electrònica de l'AEAT**.
*   **Traçabilitat i Transició**: El programari ha de permetre la traçabilitat i la transició entre factures.

## 3. Modalitat d'Emissió: ERP o Plataformes de Facturació Electrònica?

Les fonts no especifiquen si la generació i l'enviament s'han de fer exclusivament a través d'un ERP o mitjançant plataformes de facturació electrònica dedicades. El focus principal de la normativa és l'**homologació i la funcionalitat del programari**, independentment del seu tipus:

*   La clau és que el **programari utilitzat (sigui un ERP, un mòdul de gestió empresarial o una plataforma de facturació específica) compleixi amb tots els requisits tècnics i de seguretat definits per l'AEAT i estigui homologat**.
*   Qualsevol sistema que sigui capaç de generar factures en els formats estructurats requerits (XML, JSON), incloure el QR i el hash, i realitzar l'enviament automàtic i immediat a l'AEAT (en cas de la modalitat Verifactu), serà vàlid.
*   Per tant, si un ERP o un altre sistema de gestió pot integrar aquestes funcionalitats i obtenir la certificació necessària, podrà ser utilitzat per a la facturació sota Verifactu.

## 4. Elements Necessaris en el XML (o Format Estructurat)

Les fonts estableixen que les factures s'han d'emetre en **formats electrònics estructurats com XML o JSON**. Tot i que les fonts **no detallen les etiquetes XML específiques** o l'estructura interna del fitxer, sí que especifiquen els **elements que obligatòriament s'han d'incorporar** en el contingut de la factura electrònica per a la seva validesa:

*   **Codi QR**: Un codi QR únic.
*   **Empremta Digital (Hash)**: Una empremta digital o hash en cada factura i registre que permeti l'encadenament i impedeixi la manipulació.
*   **Llegenda Identificativa**: Una frase com “Factura verificable en la sede electrónica de la AEAT” o “VERIFACTU” si s'envia per Verifactu.

Aquests elements hauran d'estar degudament integrats en l'estructura del format XML (o JSON) d'acord amb les especificacions tècniques que l'AEAT publiqui per als programes de facturació.

## 5. Passos de la Factura des de l'Emissió fins a la Inclusió del Codi QR

El procés de generació i gestió d'una factura sota el sistema Verifactu segueix els següents passos clau:

1.  **Creació de la Factura amb Programari Homologat**: L'usuari crea la factura utilitzant un **programari de facturació que estigui homologat i certificat per l'AEAT**. El programari s'encarrega de generar la factura en un **format electrònic estructurat** (per exemple, XML).
2.  **Generació Automàtica del Registre i Elements de Seguretat**: En el mateix moment de l'emissió, el programari **genera automàticament un registre de facturació**. Aquest registre inclou una **empremta digital (hash)** de la factura, un **segell temporal o firma electrònica**, i l'**encadenament criptogràfic** de l'operació amb les anteriors. Això assegura la seva inalterabilitat i autenticitat.
3.  **Inclusió del Codi QR i Llegenda**: El programari homologat **incorpora automàticament un codi QR únic** a la factura. També hi afegeix la **llegenda identificativa** ("Factura verificable en la sede electrónica de la AEAT" o "VERIFACTU") si s'ha optat per la modalitat Verifactu.
4.  **Enviament Automàtic i Immediat a l'AEAT (Modalitat Verifactu)**: Si l'usuari ha triat la **modalitat Verifactu** (decisió que es pren a l'inici de l'exercici fiscal), la factura, un cop creada i amb tots els seus elements, **s'envia automàticament i de forma immediata a l'AEAT**. Aquest procés elimina les intervencions manuals i assegura la traçabilitat completa.
5.  **Validació i Centralització per part de l'AEAT**: Després de l'enviament, el sistema proporciona una **resposta automàtica de validació** que indica si la factura és acceptada o si hi ha errors que cal corregir. Un cop la factura ha estat registrada i enviada, **no és possible ocultar, alterar o eliminar-la del sistema**. Tota la informació es **centralitza i queda accessible a la seu electrònica de l'AEAT**, eliminant la necessitat de mantenir llibres de registre manuals. El sistema també registra detalladament tots els esdeveniments o interaccions per a futurs controls fiscals.

En resum, Verifactu transforma el procés de facturació electrònica cap a un model **digitalitzat, automatitzat, segur i supervisat en temps real per l'Agència Tributària**, amb un fort èmfasi en la prevenció del frau i la facilitació del control fiscal. L'adaptació a aquesta nova normativa és obligatòria i el seu incompliment pot comportar sancions considerables.