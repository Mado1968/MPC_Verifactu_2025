De acuerdo, aquí tienes la conversión del segundo archivo de texto a formato Markdown.

***

# Formato de factura electrónica XML Facturae: Ejemplo

¿Sabes qué es el formato de factura electrónica el XML Facturae? Se trata de un tipo de archivo que contiene todos los datos de una factura en un lenguaje que puede ser leído y procesado por ordenadores y plataformas informáticas. Este formato de factura electrónica es el que la normativa ha definido en España. En este artículo te contamos todo lo que necesitas saber sobre el XML Facturae con ejemplos y cómo puedes generarlo de forma sencilla y gratuita.

*   ¿Qué es el formato Facturae?
    *   Última versión: Facturae 3.2.2
*   ¿Cómo es el archivo XML Facturae? Ejemplo
    *   Estructura del formato Facturae
*   ¿Cómo crear una factura electrónica en formato Facturae?

---

## ¿Qué es el formato Facturae?

Facturae es el nombre que recibe el formato de la factura electrónica en España. Se trata un formato electrónico estructurado basado en el lenguaje XML y que define la estructura del formato de factura electrónica en España.

En el año 2006 el Ministerio de Economía y Hacienda junto con la banca definieron el modelo AEAT XML. AEAT son las siglas de la Agencia Estatal de Administración Tributaria por lo que pronto se vio la necesidad de cambiar el nombre y se pasó a denominar Facturae, que significa sencillamente Factura Electrónica.

El formato nació con la versión Facturae 3.0 pero debido a la necesidad de corregir algunos aspectos de la versión 3.0, se creó la versión Facturae 3.1 y posteriormente la versión Facturae 3.2, que ha resultado ser la más utilizada para las comunicaciones con el sector público (las versiones 3.0 y 3.1 están descontinuadas, es decir, ya no se pueden utilizar).

### Última versión del formato para la factura electrónica en España

Cuando en el año 2017 se incorporaron las comunicaciones de facturas en el sector privado, se realizaron dos versiones más, la versión Facturae 3.2.1 y Facturae 3.2.2 que extienden la funcionalidad de la versión 3.2, permitiendo informar del encaminamiento en el sector privado así como de otros temas que veremos más adelante.

Hoy por hoy, la versión de Facturae más utilizada para facturar al sector público es la 3.2 y para el sector privado la 3.2.2.

### Diferencias entre Facturae 3.2 y Facturae 3.2.2

Las diferencias entre Facturae 3.2 y Facturae 3.2.2 son técnicas y se han implementado para poder adaptar el formato a las necesidades de facturación en el entorno B2B, es decir en las relaciones entre empresas privadas. Las novedades principales son la incorporación de los siguientes elementos:

*   **Información relacionada con la cesión de Factoring:** Se han incorporado los campos `FactoringAssignmentDocument`, `DocumentCharacter`, `RepresentationIdentity`, `DocumentType`, `Repository`, `RepositoryName`.
*   **Información que permite identificar la factura rectificada.**
*   **Descripción general de la factura:** `InvoiceDescription`.
*   **Etiquetas a nivel de línea de la factura:** `ReceiverTransactionReference`, `FileReference` y `ReceiverContractReference`.
*   **Para la forma de cobro:** `PaymentInKind`, `PaymentInKindReason` y `PaymentInKindAmount`.
*   **Otros:** Se añade Kilovatio por hora en la lista de unidades y el formato HTML a la lista de formatos admitidos.
*   Además se han modificado tipos de datos, permitiendo numéricos con número de decimales variables `DoubleUpTonnDecimalType`.

---

## ¿Cómo es el formato XML Facturae? Ejemplo

Facturae es un lenguaje definido mediante XML (eXtended Markup Language) que describe el modelo de factura que se utiliza en España.

Facturae define una serie de elementos de la factura electrónica, de datos con un significado único en una estructura de fichero XML que en su conjunto describe una factura.

Por ejemplo, para definir el número de la factura se utiliza el tag `InvoiceNumber`. Un tag es una etiqueta que delimita el dato. Se abre mediante `<InvoiceNumber>` y se cierra con `</InvoiceNumber>`:

```xml
<InvoiceNumber>2022-9912</InvoiceNumber>
```

En el esquema también se define el tipo de datos permitido y (en el caso de Facturae) su tamaño. Por ejemplo, en el caso del número de factura, se permite un máximo de 20 caracteres de texto en Facturae 3.2.

Todo lenguaje XML como Facturae se define mediante un esquema (denominado XSD). Este esquema es el que marca las reglas que tienen que tener los elementos del documento XML. Las reglas que define el esquema son del tipo:

*   Orden de los elementos dentro de la factura. P.e. primero hay que poner el número de factura y después la fecha.
*   Obligatoriedad y repetición de elementos en la factura. P.e. el CIF del emisor es obligatorio, la información de pago es opcional,…
*   El formato de los elementos de datos, P.e. Número de decimales permitidos, longitud de campos…
*   Las agrupaciones de datos, Pe. los datos relativos al emisor o al receptor, o los datos relativos a las líneas.

En Facturae, los esquemas “oficiales” se pueden encontrar aquí.

### Estructura del formato de factura electrónica: Ejemplo de Facturae 3.2.2 xml

Te explicamos las principales áreas de la estructura técnica de las facturas en formato Facturae.

*   `FileHeader`: Contiene metadatos de la factura. Los más relevantes son los datos del tercero firmante. En caso que la factura la firme un tercero con firma delegada (como en el caso de B2Brouter) el campo `FileHeader/ThirdParty` contiene los datos de Invinet Sistemes (la entidad jurídica titular de B2Brouter) y el campo `InvoiceIssuer` es TE por Tercero en lugar de EM por Emisor. Otro conjunto de elementos en el `FileHeader` permite informar de datos asociados al factoring de la factura, aunque no se utiliza normalmente.
*   `Parties`: Incluye información del vendedor `SellerParty` y el comprador `BuyerParty`. La complejidad de las partes en Facturae es que tienen varias alternativas para definir ciertos aspectos. Por ejemplo, puedes definir o bien `LegalEntity` (si la parte es una entidad jurídica) o bien `Individual` (si se trata de un consumidor). Otro ejemplo, en las direcciones se diferencia entre `AddressInSpain` cuando la dirección es en España, frente a `OverseasAddress` cuando no es española. Este último `choice` es poco elegante ya que para saber si una dirección es o no es en España, bastaría con el código de país. Por otra parte, en las partes se pueden definir los `AdministrativeCenters` o unidades organizativas de una entidad. Son elementos opcionales necesarios para definir los códigos DIR3 en las entidades públicas en España. Cuando se definen centros administrativos hay que incorporar los datos de la dirección física ya que son elementos obligatorios a nivel de esquema.
*   `Invoices`: La sección `invoices` puede contener múltiples facturas (`Invoice`). No conocemos ninguna implementación de Facturae donde se utilicen más de una factura por fichero Facturae, de hecho, normalmente se prohíbe el uso de diversas facturas en un único fichero ya que los sistemas de gestión no están preparados para su gestión. Cada factura tiene las siguientes secciones:
    *   `InvoiceHeader`: Contiene información de cabecera de la factura, tal como el número y serie de la factura y el tipo y clase. El tipo y clase sirven para clasificar las facturas. Con el tipo define si es completa, abreviada, autofactura y con la clase se define si se trata de una factura original, una rectificativa o una recapitulativa. En caso de ser factura rectificativa, en `InvoiceHeader` se incluye también información de la factura corregida, donde se tiene que informar del motivo corrección y del método de corrección con dos elementos de datos cada uno, sujetos cada uno de ellos a sendas listas de códigos. Veremos ejemplos de rectificativas más adelante.
    *   `InvoiceIssueData`: Datos de cabecera de factura, como fecha de factura `IssueDate`, pero también fecha de operación `OperationDate`, así como lugar de emisión, período de facturación, moneda de emisión, tasa de cambio o idioma de la factura.
    *   `TaxesOutputs`: Esta sección es obligatoria y es donde se definen los impuestos de la factura (IVA, Recargo de Equivalencia, etc.). Cada `TaxesOutputs` puede contener muchos grupos `Tax`. Cada grupo `Tax` se utiliza para definir un tipo de impuesto con un porcentaje. Como obligatorio en cada grupo `Tax` hay que definir el `TaxTypeCode` (sujeto a una lista de códigos, p.e. 01 = IVA, 02=IPSI), el `TaxRate` que indica el porcentaje aplicado y el `TaxableBase` que es la base imponible. Además se puede definir el `TaxAmount` o importe del impuesto. Esta clase contiene dos particularidades, en primer lugar los elementos `SpecialTaxableAmount` y `SpecialTaxAmount`, campos que hacen referencia al artículo tercero punto 5 de la Ley 36/2006: Cinco. Se añade un nuevo Capítulo IX al Título IX de la Ley, con la siguiente redacción: «CAPÍTULO IX Régimen especial del grupo de entidades Artículo 163 quinquies. Requisitos subjetivos del régimen especial del grupo de entidades. Por otra parte hay los elementos `EquivalenceSurcharge` y `EquivalenceSurchargeAmount` que hacen referencia al recargo de equivalencia.
    *   `TaxesWithheld`: Sigue la misma estructura que `TaxesOutputs` pero sirve para definir el IRPF básicamente. Se tienen que informar en positivo aunque se resta del total factura.
    *   `InvoiceTotals`: Define los importes totales de la factura. Prácticamente todos los elementos de datos son obligatorios. El `TotalGrossAmount` es el total importe bruto de la factura. El `TotalGeneralDiscount` y el `TotalGeneralCharges` contienen el total de descuentos y cargos a nivel de factura respectivamente. El `TotalGrossAmountBeforeTaxes` es el bruto con descuentos y cargos a nivel de factura. El `TotalTaxesOutputs` es el total de impuestos repercutidos y el `TotalTaxesWithheld` el total de impuestos retenidos (es obligatorio, es decir, hay que ponerlo con valor 0.00 en facturas sin IRPF) y finalmente el `InvoiceTotal` que es el total factura incluyendo impuestos. Después se puede informar de otros importes como las subvenciones, los pagos a cuenta o los suplidos que veremos más adelante en ejemplos. Como elementos obligatorios adicionales hay el `TotalOutstandingAmount`, que es el total a pagar, y el `TotalExecutableAmount` que es el total a pagar menos los importes retenidos más gastos reembolsables.
    *   `Items`: Esta sección contiene múltiples líneas de factura `InvoiceLine`. Cada línea de factura tiene un gran número de referencias, aunque es difícil entender a qué hace referencia cada una. De hecho es uno de los principales problemas de Facturae, ya que distintos receptores obligan a utilizar distintas referencias. Como ejemplo tenemos `IssuerTransactionReference`, `IssuerContractReference`, `ReceiverContractReference` o `FileReference`. Además de las diversas referencias se puede describir la línea de factura, la cantidad, el precio y los impuestos a nivel de línea. Se pueden añadir descuentos y cargos a nivel de línea. También se puede incluir un identificador de artículo `ArticleCode` así como información adicional no estructurada en `AdditionalLineItemInformation`. Cada línea tiene un punto de extensión que se puede utilizar para añadir datos estructurados adicionales.
    *   `PaymentDetails`: Es una sección opcional en la que se pueden definir múltiples vencimientos mediante la clase `Installment`. Cada vencimiento debe contener una fecha `InstallmentDate`, un importe `InstallmentAmount`, y una forma de pago codificada `PaymentMeans`. De forma opcional, se puede agregar información de las cuentas bancarias `AccountToBeCredited` y `AccountToBeDebited`, referencias para facilitar la conciliación bancaria `PaymentReconciliationReference` i `DebitReconciliationReference`. Otros datos en cada vencimiento son las notas adicionales `CollectionAdditionalInformation` y un campo denominado `RegulatoryReportingData` que es un código estadístico usado en operaciones transfronterizas.
    *   `LegalLiterals`: Es una sección que puede contener múltiples `LegalReference` que son campos textuales de hasta 2500 caracteres donde se puede incluir determinada información requerida para donaciones, subvenciones, etc.
    *   `AdditionalData`: Permite relacionar números de facturas relacionadas mediante `RelatedInvoice`, relación de anexos a la factura con los datos de los anexos embebidos en base64 en `RelatedDocuments`, y notas adicionales a la factura en `InvoiceAdditionalInformation`. En `AdditionalData` también se pueden incorporar `Extensions` a nivel de una factura.
*   `Extensions`: Permite incorporar cualquier extensión estructurada a la factura.
*   `ds:Signature`: Esta sección pertenece a la especificación de la firma electrónica. Contiene los datos que permiten garantizar la identidad e integridad de la factura.

### Formato de factura FACe

Si eres proveedor de una entidad pública Española, seguramente tu cliente te ha indicado que debes enviar la factura a FACe. En este caso debes saber que no solo debes subir la factura a esta plataforma, sino que además debes crear la factura electrónica en formato XML Facturae 3.2.2. De lo contrario, no podrás registrar tus facturas.

---

## ¿Cómo crear una factura en formato Facturae 3.2.2?

Como puedes comprobar, el formato Facturae no es fácil de generar, ya que requiere de conocimientos técnicos. El Ministerio ha creado una aplicación que te permite generar este archivo, pero no es muy intuitivo ni funcional. Por eso te hablamos de otras soluciones simples, eficaces y en algunos casos gratuitas, para crear y gestionar todas tus facturas electrónicas sin complicaciones.

### ¿Sabes como generar el Facturae xml de forma rápida y sencilla?

Existen en el mercado diferentes soluciones especializadas, preparadas para facilitar la creación de facturas electrónicas en diferentes formatos estructurados como Facturae u otros (UBL, XRechnung, FatturaPA, etc). Algunas de estas soluciones ofrecen la posibilidad de generar facturas electrónicas de forma gratuita, añadiendo los datos de la factura en un formulario y convirtiendo, de forma automática, el archivo en el formato deseado por el receptor.