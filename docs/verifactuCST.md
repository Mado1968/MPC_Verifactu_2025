
# VERIFACTU: Generación de Facturas Electrónicas Válidas

El sistema VeriFactu, regulado por el Real Decreto 1007/2023, de 5 de diciembre (también conocido como Reglamento VERI*FACTU o RRSIF), es una iniciativa de la Agencia Tributaria española para **luchar contra el fraude fiscal y potenciar la digitalización** de los procesos de contabilidad empresarial. No altera materialmente las obligaciones sustantivas de facturación, que siguen rigiéndose por la normativa tributaria existente (Ley 37/1992 del IVA, RD 1624/1992, y ROF RD 1619/2012).

Su entrada en vigor está prevista para el **1 de enero de 2026 para empresas** y el **1 de julio de 2026 para autónomos** en lo que respecta a la obligación de adaptar sus programas de facturación. Los proveedores de software deben haber adaptado sus sistemas completamente antes del 29 de julio de 2025.

## Diferencia entre VERIFACTU y Factura Electrónica

Es crucial entender que **VERIFACTU y la factura electrónica no son lo mismo**.
*   La **factura electrónica** es una factura generada en un formato digital específico (como XML o PDF con firma electrónica) que cumple con ciertos estándares para ser válida sin papel.
*   **VERIFACTU** es un sistema que requiere que los programas de facturación generen **registros de facturación inalterables, trazables y automáticamente comunicables** (o disponibles para comunicación) a la Agencia Tributaria.

Los **registros de facturación** generados por Veri*Factu **no contienen la totalidad de la información de las facturas y en ningún caso son facturas electrónicas completas**. La factura propiamente dicha (que se entrega al cliente) puede ser en papel o una factura electrónica estructurada, sin que la producción obligatoria del "Registro de Facturación de Alta" la altere.

## Cómo Generar una Factura Válida para VERIFACTU

La generación de una factura válida para Veri*Factu se realiza a través del **uso de software de facturación homologado y certificado por la Agencia Tributaria**. La responsabilidad de cumplir con los requisitos técnicos recae en los desarrolladores de software. Para el usuario final (empresa o autónomo), será tan sencillo como **crear las facturas de la manera habitual y, posteriormente, pulsar un botón para conectarse y enviarlas a Hacienda**.

### Modalidades de Cumplimiento

Existen dos modalidades válidas para cumplir con la normativa:

1.  **Modalidad VERIFACTU (o "Sí Veri*Factu")**: Esta opción implica el **envío automático y en tiempo real** de los registros de facturación a la Agencia Tributaria a medida que se crean. Esta es la opción recomendada por la Administración.
    *   **Ventajas**: Menor control fiscal (al enviarse en tiempo real), facturas verificables que generan más confianza a los clientes, reducción de obligaciones fiscales y acceso a ayudas y servicios fiscales. La conservación de los registros es responsabilidad de Hacienda.
    *   **Requisitos**: Requiere conexión permanente a internet para garantizar el envío de los ficheros.
2.  **Modalidad NO VERIFACTU (o de conservación de los registros en el sistema emisor)**: En esta opción, los registros de facturación se crean con el software certificado y se guardan. **No se envían automáticamente a la AEAT, pero deben estar firmados digitalmente y a disposición de Hacienda en todo momento** si son requeridos.
    *   **Desventajas**: Mayor posibilidad de controles tributarios, las facturas no son verificables (puede reducir la confianza del cliente), más obligaciones fiscales. La pérdida de datos puede implicar el incumplimiento de la obligación de conservación.
    *   **Riesgo**: Las posibilidades de sufrir una inspección son más elevadas, ya que Hacienda podría sospechar que hay algo que ocultar.

Aunque el uso del sistema es opcional para autónomos y empresas, **el software de facturación que se utilice debe estar homologado y ser capaz de realizar el envío a Hacienda** cuando se solicite, incluso si se elige la modalidad "no Veri*Factu". Si el software no se adapta, puede acarrear multas de hasta 50.000 euros por cada ejercicio con software ilegal.

### Aplicativo Simplificado de Facturación de la AEAT

Para pequeños operadores que no necesiten un sistema informático de facturación propio, la Agencia Tributaria pondrá a disposición en su Sede Electrónica un **formulario que permitirá elaborar facturas y generar registros adaptados a la normativa**. Este aplicativo será de tipo **VERIFACTU**.

**Limitaciones de este aplicativo**:
*   Solo admite **facturas completas** (exige la completa identificación del cliente), no es utilizable para facturas simplificadas.
*   No admite facturas con múltiples destinatarios.
*   Permite acceder a un listado de la facturación remitida a la Sede Electrónica para los usuarios que hayan utilizado la modalidad VERI*FACTU.

## Requisitos Técnicos e Informáticos de los Sistemas de Facturación (SIF)

Los sistemas informáticos de facturación (SIF) homologados con Veri*Factu deben cumplir con los siguientes requisitos para garantizar la integridad y trazabilidad de los registros:

*   **Garantía de la integridad, conservación, accesibilidad, legibilidad, trazabilidad e inalterabilidad** de los registros de facturación, sin interpolaciones, omisiones o alteraciones de las que no quede debida anotación en los sistemas mismos.
*   **Generación inmediata de un "Registro de facturación de alta"** por cada factura emitida para facilitar la trazabilidad.
*   **Generación de un "Registro de facturación de anulación"** con contenido similar al del alta en caso de emisión de factura errónea.
*   **Estandarización y legibilidad** de los registros con un formato y diseño únicos.
*   **Especificación de seguridad** consistente en la generación de un **código Hash** que se produce tomando partes del registro de facturación inmediatamente anterior.
*   **Integración de una herramienta para añadir una "huella" o "hash" y la firma electrónica**.
*   **Capacidad de exportar y transmitir en línea los registros de facturación**. Cuando la modalidad sea NO VERI*FACTU, los registros podrán ser enviados directamente a través de un procedimiento simplificado y automatizado si la Administración Tributaria los requiere.
*   Para los sistemas que no sean de tipo VERIFACTU (modalidad NO VERIFACTU), además del "Hash", se incluirá la **firma electrónica de los registros efectuada por el sistema emisor**. También deberán disponer de un **"registro de eventos" del sistema** conservado con requisitos de seguridad análogos a los que se aplican a los registros de facturación.
*   Los desarrolladores del software de facturación compatible realizarán una **declaración responsable** que asegure el cumplimiento de todos los requisitos de Veri*Factu.

## Integración con ERP o Plataformas de Facturación Electrónica

El cumplimiento de Veri*Factu se puede lograr tanto a través de **ERPs integrados** como mediante **plataformas de facturación electrónica externas que se integran con los ERPs existentes**:

*   **Plataformas de Facturación Electrónica**: Soluciones como **B2Brouter** ofrecen compatibilidad con la Ley Antifraude y Veri*Factu. Proporcionan funcionalidades como el envío automático de registros a la AEAT y la generación de facturas inalterables y auditables. B2Brouter permite la **conexión vía API** con diversos ERPs como Microsoft Dynamics 365 Business Central, Sage, Odoo, Zoho y SAP, facilitando la centralización de la gestión de la facturación.
*   **Software ERP Integrado**: Plataformas como **Holded** se posicionan como soluciones de gestión empresarial que incluyen facturación, contabilidad y ERP, y están **acreditadas como Colaborador Social de la AEAT**, garantizando el cumplimiento con Veri*Factu. Permiten la integración nativa con Veri*Factu, la sincronización con la AEAT y la centralización de procesos.

En ambos casos, el objetivo es que la empresa o autónomo **adquiera un software de facturación que esté homologado**.

## Contenido del Registro de Facturación en Formato XML

Cuando se emite una factura Veri*Factu, el software certificado generará **dos tipos de archivo**:
1.  **Un archivo para el cliente**: Normalmente en formato **PDF**, que incluirá los mismos elementos que una factura habitual y, adicionalmente, un **código QR** con los datos generales de la factura y una URL a la sede de la Agencia Tributaria. Si se funciona con factura electrónica (por ejemplo, Facturae), se incluirá la URL del código QR.
2.  **Un registro para Hacienda**: Este será en formato **XML**. Este registro no es la factura completa, sino un subconjunto de información obligatoria de facturación (mencionada en el artículo 6 del ROF) a la que se añaden datos de seguridad, la identidad del sistema y la fecha y hora de producción.

Los "tags" (o elementos de datos) esenciales que debe incluir el registro de facturación en XML para garantizar su validez para Veri*Factu son:

*   La **"huella" o el "hash"**: Un código que garantiza la **inalterabilidad** del registro.
*   El **encadenamiento de la factura**: Un mecanismo que asegura la **conservación** y la relación con el registro anterior.
*   El **código de identificación del sistema informático utilizado**: Actúa como el "DNI" del software certificado.
*   **Datos de seguridad** adicionales.
*   La **identidad del sistema**.
*   La **fecha y hora de producción** del registro.

## Flujo de la Factura desde la Emisión hasta la Incrustación del Código QR (Descripción Gráfica)

Imagina un flujo lineal con puntos clave:

1.  **Emisión de la Factura (Por el profesional/empresa)**: El usuario crea una factura utilizando un software de facturación homologado (el "Sistema Informático de Facturación" - SIF).
2.  **Generación del Registro de Facturación de Alta (SIF)**: El SIF genera inmediatamente un "Registro de facturación de alta" para esta factura. Este registro incluye los datos obligatorios de facturación, la identidad del SIF y la fecha y hora de producción.
3.  **Aplicación de Seguridad (SIF)**:
    *   El SIF genera un **código Hash** que encadena este registro con el anterior, asegurando la inalterabilidad y trazabilidad.
    *   Para los sistemas NO VERI*FACTU, también se añade la **firma electrónica** de los registros y se mantiene un **registro de eventos**.
4.  **Generación del Registro en XML para Hacienda (SIF)**: El SIF crea un archivo en formato XML con los datos del registro de facturación, incluyendo el Hash y el código de identificación del sistema.
5.  **Comunicación o Conservación (SIF/AEAT)**:
    *   **Modalidad VERIFACTU**: El SIF **envía automáticamente y en tiempo real** el registro XML a la Sede Electrónica de la Agencia Tributaria (AEAT).
    *   **Modalidad NO VERIFACTU**: El SIF **conserva el registro XML** firmado digitalmente y lo pone a disposición de la AEAT si se requiere.
6.  **Validación de Hacienda y Generación del QR (AEAT)**: Una vez que el registro es recibido y validado por la AEAT (o si el SIF tiene la capacidad de generarlo directamente por validación interna en modalidad no VERI*FACTU), la Agencia Tributaria genera un **código QR único** para esta factura. Este QR contiene información clave de la factura y una URL a la Sede Electrónica.
7.  **Incrustación del QR en la Factura y Envío al Cliente (SIF)**: El SIF incrusta el código QR (y opcionalmente la leyenda "factura verificable" o VERI*FACTU) en la factura final que se entregará al cliente. Esta factura puede ser en papel o en formato digital (PDF, Facturae, etc.).
8.  **Verificación del Cliente (Opcional)**: El cliente puede utilizar una aplicación de la Agencia Tributaria para escanear el QR y validar fiscalmente el contenido de la factura.