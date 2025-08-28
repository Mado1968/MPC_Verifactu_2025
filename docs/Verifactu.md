# Sistema VERI*FACTU: Generació de Factures Electròniques Vàlides

El sistema Veri*Factu, regulat pel Reial Decret 1007/2023, de 5 de desembre (també conegut com a Reglament VERI*FACTU o RRSIF), és una iniciativa de l'Agència Tributària espanyola per a **lluitar contra el frau fiscal i potenciar la digitalització** dels processos de comptabilitat empresarial. No altera materialment les obligacions substantives de facturació, que segueixen regides per la normativa tributària existent (Llei 37/1992 de l'IVA, RD 1624/1992, i ROF RD 1619/2012).

La seva entrada en vigor està prevista per a l'**1 de gener de 2026 per a empreses** i l'**1 de juliol de 2026 per a autònoms** pel que fa a l'obligació d'adaptar els seus programes de facturació. Els proveïdors de programari han d'haver adaptat els seus sistemes completament abans del 29 de juliol de 2025.

## Diferència entre VERI*FACTU i Factura Electrònica

És crucial entendre que **VERI*FACTU i la factura electrònica no són el mateix**.
*   La **factura electrònica** és una factura generada en un format digital específic (com XML o PDF amb signatura electrònica) que compleix amb certs estàndards per ser vàlida sense paper.
*   **VERI*FACTU** és un sistema que requereix que els programes de facturació generin **registres de facturació inalterables, traçables i automàticament comunicables** (o disponibles per a comunicació) a l'Agència Tributària.

Els **registres de facturació** generats per Veri*Factu **no contenen la totalitat de la informació de les factures i en cap cas són factures electròniques completes**. La factura pròpiament dita (que es lliura al client) pot ser en paper o una factura electrònica estructurada, sense que la producció obligatòria del "Registro de Facturación de Alta" l'alteri.

## Com Generar una Factura Vàlida per a VERI*FACTU

La generació d'una factura vàlida per a Veri*Factu es realitza a través de l'**ús de programari de facturació homologat i certificat per l'Agència Tributària**. La responsabilitat de complir amb els requisits tècnics recau en els desenvolupadors de programari. Per a l'usuari final (empresa o autònom), serà tan senzill com **crear les factures de la manera habitual i, posteriorment, pulsar un botó per connectar-se i enviar-les a Hisenda**.

### Modalitats de Compliment

Existeixen dues modalitats vàlides per complir amb la normativa:

1.  **Modalitat VERI*FACTU (o "Sí Veri*Factu")**: Aquesta opció implica l'**enviament automàtic i en temps real** dels registres de facturació a l'Agència Tributària a mesura que es creen. Aquesta és l'opció recomanada per l'Administració.
    *   **Avantatges**: Menor control fiscal (en enviar-se en temps real), factures verificables que generen més confiança als clients, reducció d'obligacions fiscals i accés a ajudes i serveis fiscals. La conservació dels registres és responsabilitat d'Hisenda.
    *   **Requisits**: Requereix connexió permanent a internet per garantir l'enviament dels fitxers.
2.  **Modalitat NO VERI*FACTU (o de conservació dels registres en el sistema emissor)**: En aquesta opció, els registres de facturació es creen amb el programari certificat i es guarden. **No s'envien automàticament a l'AEAT, però han d'estar signats digitalment i a disposició d'Hisenda en tot moment** si són requerits.
    *   **Desavantatges**: Major possibilitat de controls tributaris, les factures no són verificables (pot reduir la confiança del client), més obligacions fiscals. La pèrdua de dades pot implicar l'incompliment de l'obligació de conservació.
    *   **Risc**: Les possibilitats de patir una inspecció són més elevades, ja que Hisenda podria sospitar que hi ha alguna cosa a ocultar.

Tot i que l'ús del sistema és opcional per a autònoms i empreses, **el programari de facturació que s'utilitzi ha de ser homologat i capaç de realitzar l'enviament a Hisenda** quan se sol·liciti, fins i tot si s'escull la modalitat "no Veri*Factu". Si el programari no s'adapta, pot comportar multes de fins a 50.000 euros per cada exercici amb programari il·legal.

### Aplicatiu Simplificat de Facturació de l'AEAT

Per a petits operadors que no necessitin un sistema informàtic de facturació propi, l'Agència Tributària posarà a disposició a la seva Seu Electrònica un **formulari que permetrà elaborar factures i generar registres adaptats a la normativa**. Aquest aplicatiu serà de tipus **VERI*FACTU**.

**Limitacions d'aquest aplicatiu**:
*   Només admet **factures completes** (exigeix la completa identificació del client), no és utilitzable per a factures simplificades.
*   No admet factures amb múltiples destinataris.
*   Permet accedir a un llistat de la facturació remesa a la Seu Electrònica per als usuaris que hagin utilitzat la modalitat VERI*FACTU.

## Requisits Tècnics i Informàtics dels Sistemes de Facturació (SIF)

Els sistemes informàtics de facturació (SIF) homologats amb Veri*Factu han de complir amb els següents requisits per garantir la integritat i traçabilitat dels registres:

*   **Garantia de la integritat, conservació, accessibilitat, llegibilitat, traçabilitat i inalterabilitat** dels registres de facturació, sense interpolacions, omissions o alteracions de les quals no quedi deguda anotació en els sistemes mateixos.
*   **Generació immediata d'un "Registro de facturación de alta"** per cada factura emesa per facilitar la traçabilitat.
*   **Generació d'un "Registro de facturación de anulación"** amb contingut similar al de l'alta en cas d'emissió de factura errònia.
*   **Estandardització i llegibilitat** dels registres amb un format i disseny únics.
*   **Especificació de seguretat** consistent en la generació d'un **codi Hash** que es produeix prenent parts del registre de facturació immediatament anterior.
*   **Integració d'una eina per afegir una "huella" o "hash" i la signatura electrònica**.
*   **Capacitat d'exportar i transmetre en línia els registres de facturació**. Quan la modalitat sigui NO VERI*FACTU, els registres podran ser enviats directament a través d'un procediment simplificat i automatitzat si l'Administració Tributària els requereix.
*   Per als sistemes que no siguin de tipus VERI*FACTU (modalitat NO VERI*FACTU), a més del "Hash", s'inclourà la **firma electrònica dels registres efectuada pel sistema emissor**. També hauran de disposar d'un **"registro de eventos" del sistema** conservat amb requisits de seguretat anàlegs als que s'apliquen als registres de facturació.
*   Els desenvolupadors del programari de facturació compatible realitzaran una **declaració responsable** que asseguri el compliment de tots els requisits de Veri*Factu.

## Integració amb ERP o Plataformes de Facturació Electrònica

El compliment de Veri*Factu es pot assolir tant a través d'**ERPs integrats** com mitjançant **plataformes de facturació electrònica externes que s'integren amb els ERPs existents**:

*   **Plataformes de Facturació Electrònica**: Solucions com **B2Brouter** ofereixen compatibilitat amb la Llei Antifrau i Veri*Factu. Proporcionen funcionalitats com l'enviament automàtic de registres a l'AEAT i la generació de factures inalterables i auditables. B2Brouter permet la **connexió via API** amb diversos ERPs com Microsoft Dynamics 365 Business Central, Sage, Odoo, Zoho i SAP, facilitant la centralització de la gestió de la facturació.
*   **Programari ERP Integrat**: Plataformes com **Holded** es posicionen com a solucions de gestió empresarial que inclouen facturació, comptabilitat i ERP, i estan **acreditades com a Col·laborador Social de l'AEAT**, garantint el compliment amb Veri*Factu. Permeten la integració nativa amb Veri*Factu, la sincronització amb l'AEAT i la centralització de processos.

En ambdós casos, l'objectiu és que l'empresa o autònom **adquireixi un programari de facturació que estigui homologat**.

## Contingut del Registre de Facturació en Format XML

Quan s'emet una factura Veri*Factu, el programari certificat generarà **dos tipus d'arxiu**:
1.  **Un arxiu per al client**: Normalment en format **PDF**, que inclourà els mateixos elements que una factura habitual i, addicionalment, un **codi QR** amb les dades generals de la factura i una URL a la seu de l'Agència Tributària. Si es funciona amb factura electrònica (per exemple, Facturae), s'inclourà la URL del codi QR.
2.  **Un registre per a Hisenda**: Aquest serà en format **XML**. Aquest registre no és la factura completa, sinó un subconjunt d'informació obligatòria de facturació (mencionada a l'article 6 del ROF) a la qual s'afegeixen dades de seguretat, la identitat del sistema i la data i hora de producció.

Els "tags" (o elements de dades) essencials que ha d'incloure el registre de facturació en XML per garantir la seva validesa per a Veri*Factu són:

*   La **"huella" o el "hash"**: Un codi que garanteix la **inalterabilitat** del registre.
*   L'**encadenament de la factura**: Un mecanisme que assegura la **conservació** i la relació amb el registre anterior.
*   El **codi d'identificació del sistema informàtic utilitzat**: Actua com el "DNI" del programari certificat.
*   **Dades de seguretat** addicionals.
*   La **identitat del sistema**.
*   La **data i hora de producció** del registre.

## Flux de la Factura des de l'Emissió fins a la Incrustació del Codi QR (Descripció Gràfica)

Imagina un flux lineal amb punts clau:

1.  **Emissió de la Factura (Pel professional/empresa)**: L'usuari crea una factura utilitzant un programari de facturació homologat (el "Sistema Informàtic de Facturació" - SIF).
2.  **Generació del Registre de Facturació de Alta (SIF)**: El SIF genera immediatament un "Registro de facturación de alta" per a aquesta factura. Aquest registre inclou les dades obligatòries de facturació, la identitat del SIF i la data i hora de producció.
3.  **Aplicació de Seguretat (SIF)**:
    *   El SIF genera un **codi Hash** que encadena aquest registre amb l'anterior, assegurant la inalterabilitat i traçabilitat.
    *   Per als sistemes NO VERI*FACTU, també s'afegeix la **signatura electrònica** dels registres i es manté un **registre d'esdeveniments**.
4.  **Generació del Registre en XML per a Hisenda (SIF)**: El SIF crea un arxiu en format XML amb les dades del registre de facturació, incloent el Hash i el codi d'identificació del sistema.
5.  **Comunicació o Conservació (SIF/AEAT)**:
    *   **Modalitat VERI*FACTU**: El SIF **envia automàticament i en temps real** el registre XML a la Seu Electrònica de l'Agència Tributària (AEAT).
    *   **Modalitat NO VERI*FACTU**: El SIF **conserva el registre XML** signat digitalment i el fa disponible per a l'AEAT si es requereix.
6.  **Validació d'Hisenda i Generació del QR (AEAT)**: Un cop el registre és rebut i validat per l'AEAT (o si el SIF té la capacitat de generar-lo directament per validació interna en modalitat no VERI*FACTU), l'Agència Tributària genera un **codi QR únic** per a aquesta factura. Aquest QR conté informació clau de la factura i una URL a la Seu Electrònica.
7.  **Incrustació del QR en la Factura i Enviament al Client (SIF)**: El SIF incrusta el codi QR (i opcionalment la llegenda "factura verificable" o VERI*FACTU) en la factura final que es lliurarà al client. Aquesta factura pot ser en paper o en format digital (PDF, Facturae, etc.).
8.  **Verificació del Client (Opcional)**: El client pot utilitzar una aplicació de l'Agència Tributària per escanejar el QR i validar fiscalment el contingut de la factura.