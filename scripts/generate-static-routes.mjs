import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const siteUrl = 'https://www.enpesos.cl';
const distDir = path.resolve(process.cwd(), 'dist');
const templatePath = path.join(distDir, 'index.html');

const routes = [
  {
    path: '/',
    title: 'Cupo en dólares a pesos chilenos | EnPesos.cl',
    description: 'Cotiza tu cupo en dólares de la tarjeta, revisa cuántos pesos chilenos podrías recibir y decide con costo claro, proceso asistido y sin claves bancarias.',
    h1: 'Convierte el cupo en dólares de tu tarjeta en pesos chilenos',
    category: 'Inicio',
    intro: 'Primero cotizas cuánto podrías recibir en pesos chilenos. Si decides avanzar, se realiza una operación asistida con tu tarjeta y recibes una transferencia en tu cuenta.',
    points: ['Cotización previa antes de decidir', 'Pesos chilenos en tu cuenta si avanzas y la operación se confirma', 'Sin claves bancarias ni CVV por WhatsApp', 'Puede generarse un cargo o deuda en tu tarjeta'],
    extraSections: [
      {
        heading: 'Qué es el cupo internacional de tu tarjeta',
        paragraphs: [
          'Muchas tarjetas de crédito emitidas en Chile incluyen un cupo internacional aprobado por el banco o emisor, pensado originalmente para compras en el extranjero o en sitios que facturan en dólares. Una parte importante de las personas usa poco ese cupo porque no viaja seguido ni compra habitualmente en dólares, por lo que queda disponible sin utilizarse.',
          'EnPesos ayuda a evaluar una operación asistida para que ese cupo internacional disponible se traduzca en una cotización de pesos chilenos, siempre revisando primero el caso antes de avanzar.',
        ],
      },
      {
        heading: 'Cómo se revisa cada cotización',
        paragraphs: [
          'Cada solicitud se evalúa de forma individual porque el monto final que podrías recibir depende de varias variables: el tipo de tarjeta, el banco o emisor, el cupo internacional disponible en el momento de cotizar, el dólar de referencia y los costos de procesamiento asociados.',
          'Por eso esta página no muestra un monto neto automático ni una tasa fija: la manera responsable de saber cuánto podrías recibir es solicitar una cotización real para tu caso y revisarla con calma antes de decidir si te conviene avanzar.',
        ],
      },
      {
        heading: 'Qué información se pide y qué no se pide',
        paragraphs: [
          'Para orientar una cotización normalmente se solicitan datos básicos, como nombre, un medio de contacto, el banco o tipo de tarjeta y el monto aproximado que quieres evaluar.',
          'EnPesos no pide clave bancaria, clave de internet, token, coordenadas, códigos de verificación ni acceso remoto a tu celular o computador, y tampoco solicita el CVV por WhatsApp. Si alguien te pide esa información a nombre de EnPesos, no se la entregues y verifica que estás usando un canal oficial enlazado desde este sitio.',
        ],
      },
      {
        heading: 'Qué pasa después con tu tarjeta',
        paragraphs: [
          'Es importante entender que usar el cupo internacional no queda fuera de tu tarjeta: si confirmas una operación, puede generarse un cargo o deuda posterior en tu tarjeta de crédito, y esas condiciones —fecha de facturación, tipo de cambio aplicado, intereses y pago mínimo— dependen del banco o emisor que la emitió, no de EnPesos.',
          'Tampoco es posible anticipar un tiempo exacto para cada caso, porque cada revisión toma un curso distinto. Pedir una cotización no te obliga a continuar: puedes preguntar, comparar y decidir con calma. La atención se realiza por WhatsApp, que funciona como canal para resolver dudas y coordinar la revisión de tu caso.',
        ],
      },
      {
        heading: 'Antes de decidir, compara con calma',
        paragraphs: [
          'Antes de aceptar cualquier cotización, tiene sentido comparar el monto estimado con otras alternativas que puedas tener disponibles, revisar tu capacidad de pago y confirmar que entiendes cómo se reflejará el cargo en tu próximo estado de cuenta.',
          'No existe una respuesta única para todos los casos: el monto, el costo y las condiciones cambian según tu banco o emisor, tu tarjeta y el momento en que cotizas. Si en algún punto del proceso una operación no puede completarse, se detiene y se revisa el caso antes de cualquier paso siguiente.',
        ],
      },
    ],
  },
  {
    path: '/que-es-enpesos',
    title: 'Qué es EnPesos | Cupo internacional a pesos chilenos',
    description: 'Conoce qué hace EnPesos, cómo funciona la cotización por WhatsApp y por qué no es un préstamo, crédito ni avance bancario.',
    h1: 'Qué es EnPesos y cómo funciona la cotización de cupo internacional',
    category: 'Funcionamiento',
    intro: 'EnPesos ayuda a evaluar una operación usando cupo internacional disponible de una tarjeta de crédito para recibir una cotización en pesos chilenos. La decisión de avanzar se toma solo después de revisar condiciones.',
    points: ['Evalúas tu cupo disponible', 'Recibes una cotización previa', 'Revisas costos y condiciones', 'Decides si avanzar o no'],
  },
  {
    path: '/como-funciona',
    title: 'Como funciona EnPesos | Cupo en dolares a pesos chilenos',
    description: 'Conoce como EnPesos te ayuda a cotizar tu cupo en dolares de la tarjeta, ver cuantos pesos podrias recibir y entender el cargo posterior antes de decidir.',
    h1: 'Como funciona EnPesos: cotizas primero y decides despues',
    category: 'Proceso',
    intro: 'Si tu tarjeta tiene cupo internacional disponible, EnPesos te ayuda a cotizar cuantos pesos chilenos podrias recibir usando ese cupo. Si decides avanzar, se realiza una operacion asistida con tu tarjeta y recibes una transferencia en pesos en tu cuenta.',
    points: ['Indicas el monto que quieres cotizar', 'Recibes una cotizacion previa', 'Revisas costo y condiciones', 'Puede generarse un cargo o deuda en tu tarjeta'],
    extraSections: [
      {
        heading: 'Antes de cotizar: qué necesitas tener',
        paragraphs: [
          'Para pedir una cotización necesitas tener una tarjeta de crédito con cupo internacional disponible y saber, de forma aproximada, cuánto quieres evaluar en dólares. No necesitas viajar ni tener compras previas en el extranjero: el cupo internacional suele estar aprobado igual, aunque lo uses poco.',
          'Antes de escribir por WhatsApp, revisa tu estado de cuenta para confirmar que el cupo aparece disponible y si ya existen cargos pendientes que podrían afectar tu capacidad de pago más adelante.',
        ],
      },
      {
        heading: 'Qué pasa durante la revisión de tu caso',
        paragraphs: [
          'Una vez que escribes por WhatsApp, se revisan los datos básicos necesarios para orientar la cotización: banco o tipo de tarjeta, monto aproximado y confirmación de cupo internacional disponible.',
          'Cada caso se evalúa de forma individual porque el monto final depende del tipo de tarjeta, el banco o emisor, el dólar de referencia y los costos de procesamiento del momento. No se promete un resultado ni un tiempo exacto antes de revisar esta información, porque cada caso puede tomar un curso distinto.',
        ],
      },
      {
        heading: 'Qué información se pide y qué nunca se pide',
        paragraphs: [
          'Normalmente se solicitan datos como nombre, contacto, banco o tipo de tarjeta, monto aproximado y, si decides avanzar, una cuenta bancaria chilena a nombre del titular validado.',
          'EnPesos nunca pide clave bancaria, clave de internet, token, coordenadas, códigos de verificación, acceso remoto a tu celular o computador, ni el CVV por WhatsApp, y tampoco pide fotos completas de tu tarjeta por ambos lados. Si alguien te solicita esos datos a nombre de EnPesos, no se los entregues.',
        ],
      },
      {
        heading: 'Qué pasa con tu tarjeta si decides avanzar',
        paragraphs: [
          'Si decides avanzar y la operación se confirma, puede generarse un cargo o deuda posterior en tu tarjeta de crédito. Ese cargo depende de las condiciones de tu banco o emisor: fecha de facturación, tipo de cambio aplicado, pago mínimo e intereses si no pagas el total facturado.',
          'EnPesos no define esas condiciones y tampoco puede anticipar un tiempo exacto para cada revisión, porque depende de la información de tu banco o emisor y del propio caso.',
        ],
      },
      {
        heading: 'Si una operación no puede completarse',
        paragraphs: [
          'No todos los casos avanzan hasta el final. Si una operación no puede completarse por algún motivo, el proceso se detiene y se revisa el caso antes de cualquier siguiente paso, sin presionarte a continuar.',
          'Cotizar tampoco te obliga a avanzar: puedes preguntar, comparar y desistir en cualquier momento si la información no te hace sentido. WhatsApp funciona como canal de contacto para resolver dudas, no como una promesa de aprobación.',
        ],
      },
      {
        heading: 'Qué revisar en tu estado de cuenta',
        paragraphs: [
          'Antes de aceptar una cotización, revisa en tu estado de cuenta cuánto cupo internacional aparece disponible, si tienes cargos pendientes y qué condiciones informa tu banco o emisor sobre compras o cargos en dólares.',
          'Esta revisión previa ayuda a que la cotización que recibas tenga sentido con tu situación real y a que entiendas con más claridad qué puede pasar después con tu tarjeta.',
        ],
      },
    ],
  },
  {
    path: '/preguntas-frecuentes',
    title: 'Preguntas frecuentes EnPesos | Cupo en dolares a pesos',
    description: 'Resuelve dudas sobre EnPesos: cotizacion, costos, seguridad, datos que no pedimos, deuda posterior en la tarjeta y diferencias con prestamos o avances.',
    h1: 'Preguntas frecuentes sobre EnPesos',
    category: 'Preguntas frecuentes',
    intro: 'Resuelve dudas sobre cotizacion, costos, seguridad, datos que no pedimos, transferencia en pesos y cargo o deuda posterior en tu tarjeta.',
    points: ['Que es y que no es EnPesos', 'Costos y cotizacion', 'Seguridad y datos', 'Tarjeta, banco y deuda'],
  },
  {
    path: '/seguridad',
    title: 'Seguridad EnPesos | Datos que no pedimos y proceso claro',
    description: 'Conoce las reglas de seguridad de EnPesos. No pedimos claves bancarias ni CVV por WhatsApp. Revisa datos, titularidad y costos antes de decidir.',
    h1: 'Seguridad en EnPesos: cotiza sin entregar claves bancarias',
    category: 'Seguridad',
    intro: 'Antes de avanzar debes ver cuanto podrias recibir en pesos, el costo y las condiciones. EnPesos no pide claves bancarias ni CVV por WhatsApp.',
    points: ['No pedimos claves bancarias', 'No pedimos CVV por WhatsApp', 'Usa canales enlazados desde enpesos.cl y redes oficiales', 'Si algo no puede completarse, se detiene el proceso'],
  },
  {
    path: '/nosotros',
    title: 'Quiénes somos | Proceso asistido y transparente | EnPesos.cl',
    description: 'Conoce EnPesos, un servicio chileno que te ayuda a cotizar tu cupo en dolares a pesos chilenos con atencion humana, claridad y sin claves bancarias.',
    h1: 'Quienes somos y como trabajamos en EnPesos',
    category: 'Nosotros',
    intro: 'EnPesos es un servicio chileno que ayuda a cotizar cuantos pesos chilenos podrias recibir usando el cupo en dolares de tu tarjeta, con atencion humana, costo claro antes de decidir y sin claves bancarias.',
    points: ['Atencion humana', 'Cotizacion previa', 'No somos banco ni casa de cambio', 'No entregamos prestamos ni creditos'],
  },
  {
    path: '/guias',
    title: 'Guías EnPesos | Cupo internacional, financiamiento y liquidez',
    description: 'Guías para entender cupo internacional, financiamiento para personas, liquidez para negocios, seguridad, costos y alternativas antes de cotizar.',
    h1: 'Guías EnPesos para comparar antes de cotizar',
    category: 'Guías',
    intro: 'La sección de guías reúne contenidos comerciales y educativos para entender alternativas de liquidez, financiamiento, cupo en dólares, bancos, tarjetas, seguridad y costos antes de solicitar una cotización.',
    points: ['Cupo en dólares a pesos', 'Financiamiento para personas', 'Financiamiento para negocios', 'Seguridad y costos antes de operar'],
  },
  {
    path: '/cupo-en-dolares-a-pesos-chilenos',
    title: 'Cupo en dólares a pesos chilenos | EnPesos.cl',
    description: 'Cotiza tu cupo en dólares o cupo internacional disponible a pesos chilenos por WhatsApp, con atención humana, costos claros y sin claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos con cotización previa',
    category: 'Cupo en dólares',
    intro: 'Si tienes una tarjeta de crédito con cupo internacional disponible, puedes solicitar una cotización para evaluar cuánto podrías recibir en pesos chilenos. EnPesos no entrega préstamos, no aumenta cupos y no pide claves bancarias.',
    points: ['No es préstamo, crédito ni avance bancario', 'Usa cupo internacional ya disponible', 'Cotización antes de decidir', 'Atención por WhatsApp'],
  },
  {
    path: '/formas-de-financiamiento-para-personas-chile',
    title: 'Formas de financiamiento para personas en Chile | EnPesos.cl',
    description: 'Compara crédito de consumo, avance en efectivo, tarjeta de crédito y cupo internacional disponible antes de decidir. Revisa costo total, plazo, condiciones y deuda posterior.',
    h1: 'Formas de financiamiento para personas: crédito, avance, tarjeta y cupo en dólares',
    category: 'Financiamiento personal',
    intro: 'Si necesitas pesos chilenos, conviene comparar antes de decidir. Un crédito de consumo, un avance en efectivo, usar la tarjeta de crédito o cotizar cupo internacional disponible tienen costos, plazos y consecuencias distintas.',
    points: ['Crédito de consumo, avance en efectivo, tarjeta y cupo internacional disponible', 'Comparar costo total, plazo, banco o emisor y capacidad de pago', 'Revisar condiciones antes de aceptar cualquier alternativa', 'El cupo internacional puede generar un cargo o deuda posterior en la tarjeta'],
  },
  {
    path: '/financiamiento-para-negocios-y-pymes-chile',
    title: 'Financiamiento para negocios y pymes en Chile | EnPesos.cl',
    description: 'Compara financiamiento para negocios y pymes: crédito comercial, factoring, línea de crédito, proveedores, subsidios y cupo internacional disponible.',
    h1: 'Financiamiento para negocios y pymes en Chile',
    category: 'Financiamiento negocios',
    intro: 'Un negocio puede necesitar caja para inventario, proveedores o desfases de pago. Esta guía compara alternativas y muestra cuándo puede hacer sentido cotizar cupo internacional disponible.',
    points: ['Crédito comercial', 'Factoring', 'Línea de crédito empresa', 'Cupo internacional para caja puntual'],
  },
  {
    path: '/es-seguro-cambiar-cupo-en-dolares-a-pesos',
    title: '¿Es seguro cambiar cupo en dólares a pesos? | EnPesos.cl',
    description: 'Sí es seguro cambiar cupo en dólares a pesos si hay cotización previa, titularidad validada, costos claros y no compartes claves bancarias.',
    h1: '¿Es seguro cambiar cupo en dólares a pesos?',
    category: 'Seguridad',
    intro: 'Cambiar o cotizar cupo en dólares puede ser seguro cuando el proceso se hace por canales oficiales, con costos claros, validación de titularidad y sin entregar claves bancarias, token, coordenadas ni acceso remoto.',
    points: ['No entregues claves bancarias', 'Pide cotización previa', 'Revisa titularidad y condiciones', 'Evita ofertas poco claras'],
  },
  {
    path: '/bancos-y-tarjetas-cupo-en-dolares',
    title: 'Bancos y tarjetas con cupo en dólares | EnPesos.cl',
    description: 'Revisa qué considerar según banco, emisor o marca de tarjeta antes de cotizar cupo en dólares a pesos chilenos por WhatsApp.',
    h1: 'Cupo en dólares según banco o tarjeta',
    category: 'Bancos y tarjetas',
    intro: 'El banco, emisor o marca de tarjeta puede influir en la evaluación de una cotización. EnPesos no representa a bancos ni marcas, y revisa caso a caso según cupo internacional disponible y condiciones informadas.',
    points: ['Banco o emisor', 'Marca de tarjeta', 'Cupo internacional disponible', 'Monto y condiciones del caso'],
    extraSections: [
      {
        heading: 'Por qué el banco o la marca de tarjeta influye en la cotización',
        paragraphs: [
          'El banco, el emisor o la marca de la tarjeta —Visa, Mastercard u otra— ayudan a entender el caso, porque cada uno puede definir sus propias reglas de cupo internacional, límites, facturación y tipo de cambio. Por eso una misma solicitud puede verse distinta según la tarjeta involucrada.',
          'EnPesos revisa cada caso de forma individual y no asume automáticamente que dos tarjetas del mismo banco o de la misma marca tendrán las mismas condiciones, porque también influyen el cupo disponible en el momento, el monto que quieres cotizar y el estado de la tarjeta.',
        ],
      },
      {
        heading: 'Bancos, emisores y marcas que puedes consultar',
        paragraphs: [
          'En esta página puedes revisar información orientativa si tienes una tarjeta de BancoEstado, Santander, Banco de Chile, BCI, Scotiabank, Itaú o CMR Falabella, o si tu tarjeta es de marca Visa o Mastercard.',
          'La lista no significa que todas las tarjetas de ese banco o marca sean compatibles automáticamente: cada solicitud se revisa según el cupo internacional disponible, el monto y las condiciones informadas en el momento de cotizar.',
        ],
      },
      {
        heading: 'EnPesos no representa a bancos ni marcas',
        paragraphs: [
          'EnPesos no es un banco, no es emisor de tarjetas y no tiene relación oficial, convenio ni representación con BancoEstado, Santander, Banco de Chile, BCI, Scotiabank, Itaú, CMR Falabella, Visa ni Mastercard. Mencionar estos nombres es solo referencial, para ayudarte a ubicar tu caso más rápido.',
          'Las condiciones de tu tarjeta, como intereses, facturación, tipo de cambio y pago mínimo, siempre las define tu banco o emisor, no EnPesos.',
        ],
      },
      {
        heading: 'Qué revisar antes de cotizar según tu banco o tarjeta',
        paragraphs: [
          'Antes de escribir por WhatsApp, revisa cuánto cupo internacional aparece disponible en tu tarjeta, si tienes cargos pendientes que podrían afectar tu capacidad de pago y qué condiciones informa tu banco o emisor sobre compras o cargos en dólares.',
          'Esta información ayuda a que la cotización que recibas tenga sentido con tu situación real. EnPesos no pide clave bancaria, clave de internet, token, coordenadas, códigos de verificación, acceso remoto ni el CVV por WhatsApp en ningún momento del proceso.',
        ],
      },
      {
        heading: 'Cotizar no garantiza compatibilidad',
        paragraphs: [
          'Solicitar una cotización te permite revisar información sobre tu caso, pero no asegura que tu tarjeta sea compatible ni garantiza un resultado. La decisión de avanzar se toma solo después de conocer el monto estimado, el costo y las condiciones, y siempre puede generarse un cargo o deuda posterior en tu tarjeta según las condiciones de tu banco o emisor.',
          'WhatsApp es el canal para resolver dudas y coordinar esta revisión, no una promesa de aprobación ni de tiempo exacto.',
        ],
      },
      {
        heading: 'Si tu banco o tarjeta no aparece en la lista',
        paragraphs: [
          'Si tu tarjeta es de un banco, emisor o marca que no aparece mencionado en esta página, igualmente puedes escribir por WhatsApp e indicar tu caso. La revisión no depende únicamente de que el nombre esté listado aquí, sino del cupo internacional disponible, el monto que quieres evaluar y las condiciones vigentes de tu tarjeta en ese momento.',
        ],
      },
      {
        heading: 'Qué hacer si dudas de un contacto',
        paragraphs: [
          'Si recibes un mensaje que dice representar a EnPesos junto a un banco, emisor o marca de tarjeta y te pide información sensible, no respondas y verifica usando los canales oficiales enlazados desde este sitio. EnPesos no solicita claves bancarias, token, coordenadas ni acceso remoto por ningún canal, incluido WhatsApp.',
        ],
      },
    ],
  },
  {
    path: '/cuanto-recibo-por-mi-cupo-en-dolares',
    title: 'Cuánto recibo por mi cupo en dólares | EnPesos.cl',
    description: 'Entiende qué factores influyen en cuánto podrías recibir por tu cupo en dólares: monto, dólar referencial, costos, comisión, condiciones y deuda posterior.',
    h1: 'Cuánto recibo por mi cupo en dólares',
    category: 'Costos y monto neto',
    intro: 'No hay un monto automático exacto sin cotización. El neto que podrías recibir en pesos depende del monto, dólar referencial, costos, comisión si corresponde, condiciones del caso y momento de confirmación.',
    points: ['Monto en dólares que quieres cotizar', 'Dólar referencial del momento', 'Costos, comisión si corresponde y condiciones del caso', 'Una calculadora automática puede ser solo referencial', 'Puede generarse cargo o deuda posterior en la tarjeta'],
  },
  {
    path: '/vender-cupo-en-dolares-chile',
    title: 'Vender cupo en dólares en Chile | Cómo funciona | EnPesos.cl',
    description: 'Guía para entender qué significa vender o cotizar cupo en dólares en Chile, qué revisar y cómo evitar riesgos antes de avanzar.',
    h1: 'Vender cupo en dólares en Chile: cómo funciona y qué revisar',
    category: 'Funcionamiento',
    intro: 'La expresión vender cupo en dólares suele usarse para describir una operación donde una persona evalúa su cupo internacional disponible para recibir pesos chilenos. Lo responsable es revisar condiciones, costos y seguridad antes de avanzar.',
    points: ['Cotización previa', 'Cupo internacional disponible', 'Sin claves bancarias', 'Decisión informada'],
  },
  {
    path: '/liquidez-para-negocios-cupo-internacional',
    title: 'Liquidez para negocios con cupo internacional | EnPesos.cl',
    description: 'Evalúa cupo internacional disponible como alternativa de liquidez puntual para negocios, proveedores, inventario o desfases de caja.',
    h1: 'Liquidez para negocios con cupo internacional disponible',
    category: 'Negocios',
    intro: 'Algunos negocios necesitan caja para inventario, proveedores o desfases de pago. Si el dueño o empresa cuenta con cupo internacional disponible, puede cotizar una alternativa antes de solicitar un crédito comercial nuevo.',
    points: ['Capital de trabajo puntual', 'Proveedores', 'Inventario', 'Cotización antes de decidir'],
  },
  {
    path: '/avance-cupo-en-dolares-online',
    title: 'Avance cupo en dólares online: qué significa | EnPesos.cl',
    description: 'Compara avance en efectivo, avance bancario y cupo en dólares disponible. EnPesos no es préstamo ni crédito; cotiza primero y revisa condiciones.',
    h1: 'Avance cupo en dólares online: avance en efectivo vs cupo en dólares',
    category: 'Alternativas',
    intro: 'Un avance en efectivo es un producto del banco o emisor. Usar cupo internacional disponible es distinto: puedes cotizar cuánto recibirías en pesos, revisar costo y condiciones, y decidir después.',
    points: ['Diferencia entre avance bancario, avance con tarjeta y cupo internacional', 'EnPesos no es un avance bancario tradicional', 'Compara monto neto, costo total, plazo y condiciones', 'Puede generarse cargo o deuda posterior en la tarjeta'],
    extraSections: [
      {
        heading: 'Qué diferencia hay entre un avance en efectivo y el cupo en dólares',
        paragraphs: [
          "Cuando alguien busca 'avance cupo en dólares online', muchas veces está comparando dos cosas distintas. Un avance en efectivo es un producto que entrega directamente el banco o emisor de la tarjeta, con sus propias condiciones de comisión, interés y facturación.",
          'Usar el cupo internacional disponible es diferente: EnPesos no entrega ese avance ni define sus condiciones; ayuda a cotizar una operación asistida para recibir pesos chilenos usando el cupo que ya está aprobado en tu tarjeta, mostrando antes el monto estimado, el costo y las condiciones del caso.',
        ],
      },
      {
        heading: 'Qué deberías comparar antes de decidir',
        paragraphs: [
          'Antes de elegir cualquier alternativa conviene comparar el monto neto que recibirías, el costo total asociado, el plazo, la facturación y, sobre todo, qué cargo o deuda quedará después en tu tarjeta.',
          'Comparar solo por el nombre del producto no es suficiente: dos operaciones pueden verse parecidas pero tener condiciones distintas según el banco o emisor. Revisar esta información con calma, antes de aceptar, es lo que permite decidir si te conviene avanzar o si prefieres evaluar otra alternativa.',
        ],
      },
      {
        heading: 'Qué información se revisa antes de cotizar',
        paragraphs: [
          'Para orientar una cotización se revisan datos básicos, como el banco o tipo de tarjeta, el monto aproximado que quieres evaluar y el cupo internacional disponible en ese momento.',
          'No se solicitan claves bancarias, clave de internet, token, coordenadas, códigos de verificación ni acceso remoto a tu celular o computador, y tampoco se pide el CVV por WhatsApp. Si alguien te solicita esos datos a nombre de EnPesos, no los entregues y confirma que estás usando un canal oficial.',
        ],
      },
      {
        heading: 'Qué pasa con tu tarjeta después',
        paragraphs: [
          'Si decides avanzar y la operación se confirma, puede generarse un cargo o deuda posterior en tu tarjeta de crédito. Ese cargo se factura según las condiciones de tu banco o emisor: fecha de facturación, tipo de cambio aplicado, pago mínimo e intereses si no pagas el total.',
          'EnPesos no define esas condiciones ni puede anticipar un tiempo exacto de revisión o aprobación para cada caso, porque dependen del banco o emisor y de la información propia de tu tarjeta.',
        ],
      },
      {
        heading: 'Cotizar no obliga a avanzar',
        paragraphs: [
          'Pedir una cotización sirve para revisar información, no para comprometerte a continuar. Puedes preguntar, comparar el monto estimado con otras alternativas y desistir en cualquier momento si no te hace sentido.',
          'La atención se entrega por WhatsApp, que funciona como canal de contacto para resolver dudas y coordinar la revisión de tu caso, no como una promesa de aprobación, tasa o plazo exacto.',
        ],
      },
      {
        heading: 'Qué considerar según tu situación',
        paragraphs: [
          'No todas las personas tienen el mismo cupo internacional disponible, y no todas las tarjetas tienen las mismas condiciones. Antes de cotizar, revisa el estado actual de tu tarjeta, cuánto cupo internacional aparece disponible y si ya tienes cargos pendientes que podrían afectar tu capacidad de pago.',
          'Si no tienes claridad sobre estos puntos, lo responsable es revisarlos primero con tu banco o emisor antes de solicitar una cotización, para que la información que recibas de EnPesos tenga sentido con tu situación real.',
        ],
      },
    ],
  },
  {
    path: '/como-pagar-deuda-en-dolares-tarjeta-credito',
    title: 'Cómo pagar la deuda en dólares de la tarjeta | EnPesos.cl',
    description: 'Entiende qué pasa después de usar cupo internacional: cargo o deuda en tarjeta, facturación, tipo de cambio del banco, pago mínimo, intereses y condiciones del emisor.',
    h1: 'Qué pasa con la deuda de la tarjeta después de usar cupo en dólares',
    category: 'Deuda posterior',
    intro: 'Antes de cotizar, mira la operación completa: cuánto podrías recibir en pesos y qué cargo o deuda puede quedar después en tu tarjeta de crédito.',
    points: ['Puede generarse un cargo o deuda posterior', 'El pago depende del banco o emisor', 'Revisa facturación, tipo de cambio, pago mínimo e intereses', 'EnPesos no define condiciones bancarias'],
    extraSections: [
      {
        heading: 'Por qué puede generarse un cargo o deuda',
        paragraphs: [
          'Cuando se confirma una operación usando el cupo internacional disponible de tu tarjeta, el banco o emisor puede registrar un cargo o deuda en tu próximo estado de cuenta, de forma similar a otras operaciones realizadas con ese cupo.',
          'Este cargo no depende de EnPesos, sino de las condiciones propias de tu tarjeta. Por eso, antes de aceptar una cotización, conviene revisar no solo cuánto podrías recibir en pesos, sino también qué quedará pendiente de pagar después.',
        ],
      },
      {
        heading: 'Qué revisar en la facturación de tu tarjeta',
        paragraphs: [
          'Cada banco o emisor tiene sus propias reglas para registrar y facturar cargos asociados al cupo internacional. Es importante revisar en qué fecha se registra el cargo, cuándo vence el pago y de qué forma aparece reflejado en tu estado de cuenta, ya sea como un monto único o distribuido según las condiciones de tu tarjeta.',
          'Esta información la entrega directamente tu banco o emisor, no EnPesos, por lo que conviene consultarla antes de decidir.',
        ],
      },
      {
        heading: 'Tipo de cambio, pago mínimo e intereses',
        paragraphs: [
          'El tipo de cambio que se use para convertir o facturar el cargo depende de las reglas internas de tu banco o emisor, y puede ser distinto al que se usó para calcular tu cotización en pesos.',
          'Si no pagas el total facturado, pueden aplicarse pago mínimo, intereses u otros cargos definidos en el contrato de tu tarjeta. Revisar estas condiciones con tu banco o emisor antes de avanzar ayuda a entender el costo real de la operación en el tiempo.',
        ],
      },
      {
        heading: 'Qué define EnPesos y qué no define',
        paragraphs: [
          'EnPesos puede ayudarte a cotizar y a entender el monto estimado que podrías recibir en pesos antes de decidir, pero no define condiciones bancarias como fecha de facturación, tipo de cambio, pago mínimo o intereses: esas condiciones dependen exclusivamente de tu banco o emisor.',
          'Tampoco es posible prometer un tiempo exacto de revisión o de facturación para cada caso, porque varía según la tarjeta y el momento.',
        ],
      },
      {
        heading: 'Qué hacer si no tienes claro cómo vas a pagar',
        paragraphs: [
          'Si no tienes claridad sobre cómo se reflejará el cargo o cómo lo pagarás después, lo responsable es revisar primero la información de tu banco o emisor antes de aceptar una cotización.',
          'Puedes usar el simulador de pago de tarjeta como apoyo referencial, y escribir por WhatsApp para resolver dudas puntuales sobre el proceso de cotización, sin que eso te obligue a avanzar.',
        ],
      },
      {
        heading: 'Antes de aceptar, compara ambas partes de la operación',
        paragraphs: [
          'Lo que podrías recibir en pesos hoy y lo que tendrás que pagar después en tu tarjeta son dos partes distintas de la misma operación. Revisar solo una de ellas no es suficiente para decidir con criterio.',
          'Antes de aceptar una cotización, compara el monto neto estimado con el cargo o deuda que podría generarse, considerando tu capacidad de pago actual y las condiciones informadas por tu banco o emisor.',
        ],
      },
      {
        heading: 'Revisa tu situación antes de avanzar',
        paragraphs: [
          'Cada tarjeta y cada banco o emisor puede tener reglas distintas, por lo que no existe una respuesta única válida para todos los casos. Si tienes dudas específicas sobre tu tarjeta, tu primera consulta debería ser con tu banco o emisor, y luego puedes usar la cotización de EnPesos como información adicional antes de decidir.',
        ],
      },
    ],
  },
  {
    path: '/simulador-pago-tarjeta-credito',
    title: 'Simulador de pago de tarjeta de crédito | EnPesos.cl',
    description: 'Simula escenarios de pago de tarjeta de crédito y revisa cómo una cotización puede ayudarte a comparar opciones antes de decidir.',
    h1: 'Simulador de pago de tarjeta de crédito',
    category: 'Herramientas',
    intro: 'Simular pagos ayuda a entender cuotas, costos, monto total y capacidad de pago. EnPesos complementa esa evaluación permitiendo cotizar cupo internacional disponible cuando corresponde.',
    points: ['Compara cuotas', 'Evalúa capacidad de pago', 'Revisa costo total', 'Cotiza antes de decidir'],
  },
  {
    path: '/programa-de-colaboradores',
    title: 'Programa de colaboradores EnPesos | Referidos y alianzas',
    description: 'Conoce el programa de colaboradores de EnPesos para referidores, creadoras, asesoras y aliados que quieran derivar personas con cupo internacional disponible.',
    h1: 'Programa de colaboradores EnPesos',
    category: 'Colaboradores',
    intro: 'El programa de colaboradores está pensado para personas que conversan con clientes que podrían necesitar liquidez y cuentan con tarjeta de crédito con cupo internacional disponible.',
    points: ['Comisión por operación cerrada', 'Sin exclusividad', 'Proceso explicado por WhatsApp', 'Enfoque en personas con cupo disponible'],
  },
];

const cityRoutes = [
  {
    slug: 'santiago',
    city: 'Santiago',
    region: 'Región Metropolitana',
    title: 'Cupo en dólares desde Santiago | Cotiza a pesos chilenos',
    description: 'Cotiza desde Santiago cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. Proceso asistido, sin claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde Santiago',
  },
  {
    slug: 'las-condes',
    city: 'Las Condes',
    region: 'Región Metropolitana',
    title: 'Cupo en dólares desde Las Condes | Cotiza a pesos chilenos',
    description: 'Cotiza desde Las Condes cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. Proceso asistido, sin claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde Las Condes',
  },
  {
    slug: 'providencia',
    city: 'Providencia',
    region: 'Región Metropolitana',
    title: 'Cupo en dólares desde Providencia | Cotiza a pesos chilenos',
    description: 'Cotiza desde Providencia cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. Proceso asistido, sin claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde Providencia',
  },
  {
    slug: 'concepcion',
    city: 'Concepción',
    region: 'Región del Biobío',
    title: 'Cupo en dólares desde Concepción | Cotiza a pesos chilenos',
    description: 'Cotiza desde Concepción cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. Proceso asistido, sin claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde Concepción',
  },
  {
    slug: 'antofagasta',
    city: 'Antofagasta',
    region: 'Región de Antofagasta',
    title: 'Cupo en dólares desde Antofagasta | Cotiza a pesos chilenos',
    description: 'Cotiza desde Antofagasta cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. No somos casa de cambio ni pedimos claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde Antofagasta',
  },
  {
    slug: 'valparaiso',
    city: 'Valparaíso',
    region: 'Región de Valparaíso',
    title: 'Cupo en dólares desde Valparaíso | Cotiza a pesos chilenos',
    description: 'Cotiza desde Valparaíso cuántos pesos chilenos podrías recibir usando cupo internacional disponible de tu tarjeta. Proceso asistido, sin claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde Valparaíso',
  },
  {
    slug: 'rancagua',
    city: 'Rancagua',
    region: "Región de O'Higgins",
    title: 'Cupo en dólares desde Rancagua | Cotiza a pesos chilenos',
    description: 'Desde Rancagua, cotiza cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. Con costo claro antes de decidir.',
    h1: 'Cupo en dólares a pesos chilenos desde Rancagua',
  },
];

for (const route of cityRoutes) {
  routes.push({
    path: `/cupo-en-dolares-${route.slug}`,
    title: route.title,
    description: route.description,
    h1: route.h1,
    category: `Cobertura ${route.region}`,
    intro: `Si estás en ${route.city} y tu tarjeta tiene cupo internacional disponible, EnPesos te ayuda a cotizar cuántos pesos chilenos podrías recibir usando ese cupo. Primero ves monto estimado, costo y condiciones antes de decidir.`,
    points: [
      `Cotización de cupo en dólares desde ${route.city}`,
      'Pesos chilenos en tu cuenta si avanzas y la operación se confirma',
      'Sin claves bancarias, token, acceso remoto ni CVV por WhatsApp',
      'EnPesos no es una casa de cambio ni declara oficina local documentada',
      'Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta',
    ],
    city: route.city,
  });
}

const bankRoutes = [
  ['banco-estado', 'BancoEstado', 'Banco'],
  ['santander', 'Santander', 'Banco'],
  ['banco-de-chile', 'Banco de Chile', 'Banco'],
  ['bci', 'BCI', 'Banco'],
  ['scotiabank', 'Scotiabank', 'Banco'],
  ['itau', 'Itaú', 'Banco'],
  ['cmr-falabella', 'CMR Falabella', 'Emisor retail'],
  ['tarjeta-visa', 'Visa', 'Marca de tarjeta'],
  ['tarjeta-mastercard', 'Mastercard', 'Marca de tarjeta'],
];

for (const [slug, name, category] of bankRoutes) {
  routes.push({
    path: `/cupo-en-dolares-${slug}`,
    title: `Cupo en dólares ${name} | Cotiza por WhatsApp | EnPesos.cl`,
    description: `Cotiza cupo en dólares ${name} a pesos chilenos por WhatsApp. Revisión caso a caso, sin claves bancarias y sin relación oficial con bancos o marcas de tarjeta.`,
    h1: `Cupo en dólares ${name}: cotiza a pesos chilenos por WhatsApp`,
    category,
    intro: `Si tienes una tarjeta ${name} con cupo internacional disponible, puedes solicitar una cotización asistida por WhatsApp. EnPesos no representa a ${name}; la revisión depende del caso, monto, cupo disponible y condiciones informadas.`,
    points: [`Tarjeta o emisor ${name}`, 'Cupo internacional disponible', 'Cotización antes de avanzar', 'Sin claves bancarias ni acceso remoto'],
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildStaticContent(route) {
  const safeTitle = escapeHtml(route.h1);
  const safeDescription = escapeHtml(route.description);
  const safeIntro = escapeHtml(route.intro);
  const points = route.points.map((point) => `<li>${escapeHtml(point)}</li>`).join('\n');
  const cityContent = route.city
    ? `
        <section>
          <h2>No somos casa de cambio ni oficina local</h2>
          <p>EnPesos no es una casa de cambio, no compra ni vende divisas como actividad cambiaria y no declara una oficina física local si no está documentada. Puedes cotizar desde ${escapeHtml(route.city)} por los canales oficiales enlazados desde enpesos.cl.</p>
        </section>
        <section>
          <h2>Cargo o deuda posterior en tu tarjeta</h2>
          <p>Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de crédito, según las condiciones de tu banco o emisor.</p>
        </section>`
    : '';

  const extraSectionsContent = (route.extraSections || [])
    .map(
      (extraSection) => `
        <section>
          <h2>${escapeHtml(extraSection.heading)}</h2>
          ${extraSection.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n          ')}
        </section>`,
    )
    .join('\n');

  return `
    <main class="seo-prerender-content" data-seo-prerender="true">
      <article>
        <p>${escapeHtml(route.category)}</p>
        <h1>${safeTitle}</h1>
        <p>${safeIntro}</p>
        <p>${safeDescription}</p>
        <section>
          <h2>Qué puedes revisar antes de cotizar</h2>
          <ul>
            ${points}
          </ul>
        </section>
        ${cityContent}
        ${extraSectionsContent}
        <section>
          <h2>Información importante sobre EnPesos</h2>
          <p>EnPesos te ayuda a cotizar cuántos pesos chilenos podrías recibir usando cupo internacional disponible o cupo en dólares de tu tarjeta. Cotizar no obliga a avanzar.</p>
          <p>Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de crédito, según las condiciones de tu banco o emisor. EnPesos no entrega préstamos, no aumenta líneas de crédito, no representa bancos y no solicita claves bancarias, token, coordenadas ni acceso remoto.</p>
        </section>
      </article>
    </main>`;
}

function injectHead(html, route) {
  const canonical = `${siteUrl}${route.path === '/' ? '' : route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);

  let output = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
    .replace(/<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i, `<meta name="description" content="${description}" />`);

  output = output.replace(/<link\s+rel="canonical"[\s\S]*?>\s*/gi, '');
  output = output.replace(/<meta\s+property="og:[\s\S]*?>\s*/gi, '');
  output = output.replace(/<meta\s+name="twitter:[\s\S]*?>\s*/gi, '');

  const extraHead = `
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:site_name" content="EnPesos.cl" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: route.title,
      description: route.description,
      url: canonical,
      isPartOf: {
        '@type': 'WebSite',
        name: 'EnPesos.cl',
        url: siteUrl,
      },
    })}</script>`;

  return output.replace('</head>', `${extraHead}\n  </head>`);
}

function injectBody(html, route) {
  return html.replace('<div id="root"></div>', `<div id="root">${buildStaticContent(route)}\n    </div>`);
}

async function writeRouteHtml(template, route) {
  const html = injectBody(injectHead(template, route), route);

  if (route.path === '/') {
    await writeFile(path.join(distDir, 'index.html'), html, 'utf8');
    return;
  }

  const routeDir = path.join(distDir, route.path.replace(/^\//, ''));
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, 'index.html'), html, 'utf8');
}

const template = await readFile(templatePath, 'utf8');

for (const route of routes) {
  await writeRouteHtml(template, route);
}

console.log(`Generated static SEO HTML for ${routes.length} routes.`);
