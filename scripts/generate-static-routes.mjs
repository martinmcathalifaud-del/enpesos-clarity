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
    extraSections: [
      {
        heading: 'Si buscas financiamiento, puede que no conozcas esta alternativa',
        paragraphs: [
          'Si estás buscando financiamiento y no tienes una tarjeta de crédito con cupo internacional disponible, esta alternativa puede no aplicar a tu caso. Pero si sí tienes cupo internacional disponible, puede haber una opción que no conocías: cotizar cuántos pesos chilenos podrías recibir usando ese cupo, antes de pedir un crédito de consumo nuevo o un avance en efectivo.',
          'El cupo internacional suele estar aprobado para compras en el extranjero o en dólares, y muchas personas no lo usan porque no viajan seguido. EnPesos ayuda a evaluar si cotizar una operación con ese cupo tiene sentido para tu necesidad de pesos, siempre revisando tu caso antes de avanzar.',
        ],
      },
      {
        heading: 'Crédito de consumo, avance en efectivo y cupo internacional: qué mirar en cada uno',
        paragraphs: [
          'Un crédito de consumo es un producto financiero nuevo, con evaluación, monto aprobado, cuotas e intereses definidos por el banco o entidad que lo entrega. Un avance en efectivo usa una línea de tu tarjeta o banco, con comisiones e intereses propios del emisor. Usar el cupo internacional disponible es distinto a ambos: no es un crédito nuevo ni un avance bancario tradicional, es una cotización sobre un cupo que ya tienes aprobado en tu tarjeta.',
          'En los tres casos conviene mirar lo mismo: costo total, plazo, cuota o cargo mensual, y qué deuda quedará después. El nombre del producto importa menos que entender esas condiciones antes de aceptar.',
        ],
      },
      {
        heading: 'Por qué usar el cupo internacional no siempre es la mejor opción',
        paragraphs: [
          'Cotizar cupo internacional puede ser una alternativa a evaluar, pero no siempre conviene más que un crédito de consumo o un avance en efectivo. Depende del monto que necesitas, el banco o emisor de tu tarjeta, los costos de la operación y tu capacidad de pago para el cargo posterior.',
          'Lo responsable es comparar antes de decidir, revisando el costo total de cada alternativa y no solo cuánto dinero recibirías hoy. Si otra opción te conviene más, esta página no busca convencerte de lo contrario.',
        ],
      },
      {
        heading: 'Qué información se pide y qué no se pide para cotizar',
        paragraphs: [
          'Para orientar una cotización normalmente se piden datos básicos, como nombre, un medio de contacto, el banco o tipo de tarjeta y el monto aproximado que quieres evaluar.',
          'EnPesos no pide clave bancaria, clave de internet, token, coordenadas, códigos de verificación ni acceso remoto a tu celular o computador, y tampoco solicita el CVV por WhatsApp. Si alguien te pide esa información a nombre de EnPesos, no se la entregues.',
        ],
      },
      {
        heading: 'Qué pasa con tu tarjeta si decides avanzar',
        paragraphs: [
          'Si decides avanzar y la operación se confirma, puede generarse un cargo o deuda posterior en tu tarjeta de crédito, según las condiciones de tu banco o emisor: fecha de facturación, tipo de cambio aplicado, pago mínimo e intereses si no pagas el total.',
          'EnPesos no define esas condiciones ni puede prometer un tiempo exacto de revisión o aprobación para cada caso. WhatsApp es el canal para resolver dudas y coordinar la cotización, no una promesa de tasa o aprobación.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿Qué debo comparar antes de pedir un crédito o usar mi tarjeta?',
        answer: 'Compara costo total, plazo, cuota o pago mensual, condiciones del banco o emisor, capacidad de pago y qué deuda quedará después. No mires solo cuánto dinero recibes hoy.',
      },
      {
        question: '¿Usar cupo internacional es lo mismo que pedir un crédito de consumo?',
        answer: 'No. Un crédito de consumo es un producto financiero nuevo. EnPesos no entrega créditos ni préstamos; ayuda a cotizar cuántos pesos podrías recibir usando cupo internacional disponible de tu tarjeta.',
      },
      {
        question: '¿Usar cupo internacional siempre conviene más que un avance?',
        answer: 'No necesariamente. Puede ser una alternativa a evaluar, pero depende del monto, banco o emisor, costos, condiciones y capacidad de pago. Conviene comparar antes de decidir.',
      },
      {
        question: '¿Queda una deuda en la tarjeta?',
        answer: 'Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de crédito, según las condiciones de tu banco o emisor. Debes revisar cómo se facturará y cómo lo pagarás después.',
      },
      {
        question: '¿Cotizar con EnPesos me obliga a avanzar?',
        answer: 'No. Cotizar sirve para revisar monto estimado, costo y condiciones antes de decidir. Si no te hace sentido, no tienes obligación de continuar.',
      },
    ],
  },
  {
    path: '/financiamiento-para-negocios-y-pymes-chile',
    title: 'Financiamiento para negocios y pymes en Chile | EnPesos.cl',
    description: 'Compara financiamiento para negocios y pymes: crédito comercial, factoring, línea de crédito, proveedores, subsidios y cupo internacional disponible.',
    h1: 'Financiamiento para negocios y pymes en Chile',
    category: 'Financiamiento negocios',
    intro: 'Un negocio puede necesitar caja para inventario, proveedores o desfases de pago. Esta guía compara alternativas y muestra cuándo puede hacer sentido cotizar cupo internacional disponible.',
    points: ['Crédito comercial', 'Factoring', 'Línea de crédito empresa', 'Cupo internacional para caja puntual'],
    extraSections: [
      {
        heading: 'Si necesitas liquidez para tu negocio, puede que no conozcas esta alternativa',
        paragraphs: [
          'Si tu negocio o pyme necesita liquidez rápida y no cuenta con una tarjeta de crédito con cupo internacional disponible, esta alternativa puede no aplicar a tu caso. Pero si el dueño o la empresa sí tiene cupo internacional disponible, puede haber una opción que no conocías: cotizar cuántos pesos chilenos podrías recibir usando ese cupo antes de solicitar un crédito comercial nuevo.',
          'Esta alternativa no reemplaza un crédito PyME, factoring o línea bancaria cuando esos productos calzan mejor con tu necesidad. Sirve principalmente para evaluar caja puntual, no para financiar crecimiento de largo plazo.',
        ],
      },
      {
        heading: 'Crédito comercial, línea de crédito y cupo internacional: qué revisar en cada uno',
        paragraphs: [
          'Un crédito comercial suele requerir evaluación, garantías y antecedentes del negocio, con tasa, plazo y carga financiera definidos por el banco. Una línea de crédito empresa ayuda a cubrir desfases de caja, pero puede volverse cara si se usa como caja permanente. Cotizar cupo internacional disponible es distinto: no es un crédito nuevo, es una operación asistida sobre un cupo que la tarjeta ya tiene aprobado.',
          'En cualquiera de las tres alternativas, lo importante es comparar costo total, plazo, capacidad de pago y qué carga quedará para el negocio después de recibir el dinero.',
        ],
      },
      {
        heading: 'Por qué no siempre conviene usar el cupo internacional para el negocio',
        paragraphs: [
          'Cotizar cupo internacional puede servir para una necesidad puntual de caja, pero no siempre es la alternativa más conveniente frente a un crédito comercial, factoring o proveedores a plazo. Depende del monto, el banco o emisor de la tarjeta, los costos de la operación y la capacidad del negocio para pagar el cargo posterior.',
          'Si tu negocio tiene una necesidad recurrente o de monto grande, probablemente te convenga más evaluar un producto financiero formal para empresas antes de usar el cupo internacional de una tarjeta.',
        ],
      },
      {
        heading: 'Qué información se pide y qué no se pide para cotizar',
        paragraphs: [
          'Para orientar una cotización normalmente se piden datos básicos del negocio o del titular de la tarjeta, como nombre, contacto, banco o tipo de tarjeta y el monto aproximado que quieres evaluar.',
          'EnPesos no pide clave bancaria, clave de internet, token, coordenadas, códigos de verificación ni acceso remoto a tu celular o computador, y tampoco solicita el CVV por WhatsApp.',
        ],
      },
      {
        heading: 'Qué pasa con la tarjeta del negocio si decides avanzar',
        paragraphs: [
          'Si decides avanzar y la operación se confirma, puede generarse un cargo o deuda posterior en la tarjeta de crédito usada, según las condiciones del banco o emisor: fecha de facturación, tipo de cambio aplicado, pago mínimo e intereses si no se paga el total.',
          'EnPesos no define esas condiciones ni puede prometer un tiempo exacto de revisión o aprobación para cada caso. WhatsApp es el canal para resolver dudas del negocio y coordinar la cotización, no una promesa de tasa o aprobación.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿Qué financiamiento conviene para un negocio o pyme?',
        answer: 'Depende del objetivo: capital de trabajo, inventario, equipamiento, desfase de caja, crecimiento o urgencia. Un crédito comercial, factoring, línea de crédito, proveedores a plazo o cupo internacional pueden servir en casos distintos.',
      },
      {
        question: '¿Qué alternativa sirve para capital de trabajo urgente?',
        answer: 'Para caja de corto plazo suelen evaluarse línea de crédito, factoring, proveedores a plazo, tarjeta de crédito o una cotización usando cupo internacional disponible. Lo importante es revisar costo, plazo y capacidad de pago.',
      },
      {
        question: '¿EnPesos entrega créditos para empresas?',
        answer: 'No. EnPesos no entrega préstamos ni créditos comerciales. Ayuda a cotizar una operación usando cupo internacional disponible, para evaluar pesos chilenos antes de decidir.',
      },
      {
        question: '¿Sirve si soy independiente o emprendedor?',
        answer: 'Puede servir si tienes tarjeta de crédito con cupo internacional disponible y necesitas cotizar una alternativa de liquidez. Cada caso se revisa antes de avanzar.',
      },
      {
        question: '¿Cotizar me obliga a operar?',
        answer: 'No. Cotizar sirve para revisar monto estimado, costos y condiciones. Si no te conviene o prefieres otra alternativa, no tienes obligación de continuar.',
      },
    ],
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
    extraSections: [
      {
        heading: 'Por qué no existe una tasa fija publicada',
        paragraphs: [
          'El monto neto que podrías recibir en pesos depende de variables que cambian caso a caso: el monto en dólares que quieres cotizar, el dólar de referencia del momento, los costos de procesamiento, el banco o emisor de tu tarjeta y las condiciones vigentes al momento de confirmar. Por eso EnPesos no publica una tasa fija ni promete un porcentaje exacto para todos los casos.',
          'Publicar un número genérico sin conocer estas variables podría generar una expectativa que después no se cumple. Lo responsable es cotizar tu caso específico antes de decidir.',
        ],
      },
      {
        heading: 'Qué mirar además del monto que recibirías hoy',
        paragraphs: [
          'El monto neto en pesos es solo una parte de la operación. También conviene revisar qué cargo o deuda podría quedar después en tu tarjeta, según las condiciones de tu banco o emisor, y si tienes capacidad de pago para asumir ese cargo cuando llegue la facturación.',
          'Comparar solo el monto que recibirías hoy, sin mirar el costo posterior, puede llevar a una decisión que no te convenga en el tiempo.',
        ],
      },
      {
        heading: 'Cómo se calcula una cotización real',
        paragraphs: [
          'Una cotización real considera el monto que quieres evaluar, el dólar de referencia del momento, los costos de procesamiento aplicables y las condiciones específicas de tu banco o emisor. Por eso el resultado puede variar entre dos personas que cotizan un monto similar, si sus tarjetas o condiciones son distintas.',
          'El simulador de pago de tarjeta puede ayudarte a estimar el escenario de pago posterior, pero no reemplaza una cotización real para saber cuánto podrías recibir hoy.',
        ],
      },
      {
        heading: 'Qué información se pide y qué no se pide',
        paragraphs: [
          'Para orientar una cotización normalmente se piden datos básicos, como nombre, un medio de contacto, el banco o tipo de tarjeta y el monto aproximado que quieres evaluar.',
          'EnPesos no pide clave bancaria, clave de internet, token, coordenadas, códigos de verificación ni acceso remoto a tu celular o computador, y tampoco solicita el CVV por WhatsApp.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿Cuánto recibo por vender mi cupo en dólares?',
        answer: 'No existe un monto fijo universal. El neto final depende del monto cotizado, dólar referencial, costos, comisión, banco, tarjeta, validaciones y condiciones del caso. Por eso EnPesos cotiza caso a caso antes de avanzar.',
      },
      {
        question: '¿Por qué no hay un monto automático exacto?',
        answer: 'Porque una cotización real depende de información que puede cambiar: dólar, costos, condiciones operativas, banco o emisor y momento de confirmación. Una calculadora sin esos datos solo puede ser referencial.',
      },
      {
        question: '¿Qué significa monto neto en pesos?',
        answer: 'Es el monto estimado que recibirías finalmente en tu cuenta bancaria en pesos chilenos, después de considerar los costos y condiciones informadas en la cotización.',
      },
      {
        question: '¿Debo mirar la comisión o el monto final?',
        answer: 'La comparación más útil es mirar el monto final que recibirías en tu cuenta y las condiciones asociadas. Un porcentaje aislado no siempre cuenta toda la historia.',
      },
      {
        question: '¿Queda deuda en la tarjeta?',
        answer: 'Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de crédito, según las condiciones de tu banco o emisor.',
      },
      {
        question: '¿Cotizar me obliga a operar?',
        answer: 'No. Cotizar sirve para revisar monto estimado, costo y condiciones antes de decidir. Si no te hace sentido, no tienes obligación de avanzar.',
      },
    ],
  },
  {
    path: '/vender-cupo-en-dolares-chile',
    title: 'Vender cupo en dólares en Chile | Cómo funciona | EnPesos.cl',
    description: 'Guía para entender qué significa vender o cotizar cupo en dólares en Chile, qué revisar y cómo evitar riesgos antes de avanzar.',
    h1: 'Vender cupo en dólares en Chile: cómo funciona y qué revisar',
    category: 'Funcionamiento',
    intro: 'La expresión vender cupo en dólares suele usarse para describir una operación donde una persona evalúa su cupo internacional disponible para recibir pesos chilenos. Lo responsable es revisar condiciones, costos y seguridad antes de avanzar.',
    points: ['Cotización previa', 'Cupo internacional disponible', 'Sin claves bancarias', 'Decisión informada'],
    extraSections: [
      {
        heading: "Por qué se usa la expresión 'vender cupo en dólares'",
        paragraphs: [
          "La expresión 'vender cupo en dólares' es una forma coloquial que muchas personas usan para buscar esta alternativa en internet, aunque técnicamente no se vende ninguna tarjeta ni línea de crédito. Lo que ocurre es que se cotiza una operación usando el cupo internacional disponible de tu tarjeta, para recibir un monto estimado en pesos chilenos.",
          'EnPesos no compra tu cupo ni tu tarjeta, y tampoco aumenta el cupo internacional que el banco o emisor ya te aprobó. Solo ayuda a cotizar una operación asistida caso a caso.',
        ],
      },
      {
        heading: 'Qué revisar antes de cotizar',
        paragraphs: [
          'Antes de pedir una cotización, conviene revisar cuánto cupo internacional aparece disponible en tu tarjeta, si eres el titular de la tarjeta y de la cuenta bancaria donde recibirías los pesos, y si tienes claridad sobre cómo pagarás después el cargo que puede generarse.',
          'También conviene comparar el monto neto estimado con otras alternativas, en vez de fijarte solo en el porcentaje de comisión que menciona cada servicio.',
        ],
      },
      {
        heading: 'Qué información se pide y qué no se pide',
        paragraphs: [
          'Para orientar una cotización normalmente se piden datos básicos, como nombre, un medio de contacto, el banco o tipo de tarjeta y el monto aproximado que quieres evaluar.',
          'EnPesos no pide clave bancaria, clave de internet, token, coordenadas, códigos de verificación ni acceso remoto a tu celular o computador, y tampoco solicita el CVV por WhatsApp.',
        ],
      },
      {
        heading: 'Qué pasa con tu tarjeta después de la operación',
        paragraphs: [
          'Si decides avanzar y la operación se confirma, puede generarse un cargo o deuda posterior en tu tarjeta de crédito, según las condiciones de tu banco o emisor: fecha de facturación, tipo de cambio aplicado, pago mínimo e intereses si no pagas el total.',
          'EnPesos no define esas condiciones ni puede prometer un tiempo exacto de confirmación para cada caso. WhatsApp es el canal para resolver dudas y coordinar la cotización, no una promesa de tasa o aprobación.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿Qué significa vender cupo en dólares?',
        answer: 'Es una forma informal de referirse a cotizar una operación usando el cupo internacional disponible de una tarjeta de crédito para recibir un monto en pesos chilenos. EnPesos no compra tu tarjeta ni aumenta tu cupo; solo te ayuda a evaluar una operación caso a caso.',
      },
      {
        question: '¿EnPesos compra mi cupo en dólares?',
        answer: 'No compramos tu tarjeta ni tu línea de crédito. Lo que hacemos es ayudarte a cotizar una operación con tu cupo internacional disponible, informando el monto neto estimado antes de avanzar.',
      },
      {
        question: '¿Cuánto me descuentan por vender cupo en dólares?',
        answer: 'El descuento depende del monto, costos del proceso, banco, tarjeta y condiciones vigentes al momento de cotizar. Por eso siempre debes mirar el neto que recibirías en pesos, no solo el porcentaje de comisión.',
      },
      {
        question: '¿Es un préstamo o avance en efectivo?',
        answer: 'No. EnPesos no ofrece préstamos, avances en efectivo ni financiamiento. La operación se evalúa sobre cupo internacional que ya tienes disponible en tu tarjeta de crédito.',
      },
      {
        question: '¿Puedo usar los pesos para lo que quiera?',
        answer: 'Si la operación se completa, recibes pesos chilenos en tu cuenta bancaria. Luego puedes usarlos según tus necesidades, igual que cualquier saldo disponible en tu cuenta.',
      },
      {
        question: '¿Piden claves bancarias o acceso a mi cuenta?',
        answer: 'No. No pedimos claves bancarias, token de acceso ni datos para entrar a tu banco. El proceso debe realizarse con autorización del titular y con respaldo de la operación.',
      },
    ],
  },
  {
    path: '/liquidez-para-negocios-cupo-internacional',
    title: 'Liquidez para negocios con cupo internacional | EnPesos.cl',
    description: 'Evalúa cupo internacional disponible como alternativa de liquidez puntual para negocios, proveedores, inventario o desfases de caja.',
    h1: 'Liquidez para negocios con cupo internacional disponible',
    category: 'Negocios',
    intro: 'Algunos negocios necesitan caja para inventario, proveedores o desfases de pago. Si el dueño o empresa cuenta con cupo internacional disponible, puede cotizar una alternativa antes de solicitar un crédito comercial nuevo.',
    points: ['Capital de trabajo puntual', 'Proveedores', 'Inventario', 'Cotización antes de decidir'],
    extraSections: [
      {
        heading: 'Qué revisar antes de usar el cupo internacional de tu negocio',
        paragraphs: [
          'Antes de cotizar, conviene tener claro cuánto cupo internacional aparece disponible en la tarjeta que planeas usar, si ya existen cargos pendientes que podrían afectar la capacidad de pago del negocio, y si la necesidad de caja es puntual o corresponde a un problema más estructural.',
          'Esta alternativa está pensada para desfases puntuales, no para financiar pérdidas permanentes del negocio. Si el problema es recurrente, probablemente convenga revisar otras alternativas antes de operar.',
        ],
      },
      {
        heading: 'Quién suele tener sentido para cotizar',
        paragraphs: [
          'Suele tener sentido para dueños de negocios, empresas pequeñas o emprendimientos que ya cuentan con cupo internacional disponible en una tarjeta de crédito y necesitan resolver una necesidad puntual de caja, como pagar un proveedor, reponer inventario o cubrir un desfase de corto plazo.',
          'No está pensado para reemplazar un crédito PyME formal, factoring o una línea bancaria empresa cuando esos productos calzan mejor con el monto o el plazo que necesita el negocio.',
        ],
      },
      {
        heading: 'Qué pasa con la tarjeta del negocio después',
        paragraphs: [
          'Si decides avanzar y la operación se confirma, puede generarse un cargo o deuda posterior en la tarjeta de crédito usada, según las condiciones del banco o emisor. El pago posterior, la facturación, el tipo de cambio y los intereses dependen de esas condiciones, no de EnPesos.',
          'Antes de aceptar una cotización, conviene revisar si el negocio tiene capacidad de pago para ese cargo posterior, además del monto que recibirías hoy en pesos.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿Esto es para PyMEs o para cualquier negocio?',
        answer: 'Está pensado para dueños de negocios, empresas pequeñas, emprendimientos o PyMEs que tienen cupo internacional disponible y quieren evaluar una necesidad puntual de liquidez. Usamos “negocio” como lenguaje principal porque suele ser la forma más natural en que el cliente describe su situación.',
      },
      {
        question: '¿EnPesos entrega crédito para empresas?',
        answer: 'No. EnPesos no entrega crédito PyME, préstamo, factoring ni línea bancaria. Entregamos atención asistida para cotizar una operación usando cupo internacional disponible de una tarjeta de crédito.',
      },
      {
        question: '¿Qué tipo de necesidad de caja puede evaluar un negocio?',
        answer: 'Puede ser un pago puntual a proveedor, reposición de inventario, desfase entre ventas y cobros o gasto operativo de corto plazo. No debería usarse para tapar una falta estructural de caja sin plan de pago.',
      },
      {
        question: '¿Cotizar obliga a operar?',
        answer: 'No. Puedes pedir una cotización, revisar monto estimado, costos, condiciones y decidir si te conviene. Cotizar no significa que tengas que avanzar.',
      },
      {
        question: '¿Piden claves bancarias o acceso a cuentas?',
        answer: 'No. Nunca pedimos claves bancarias, token de acceso, contraseñas, acceso remoto a dispositivos ni control de tus cuentas.',
      },
      {
        question: '¿Puede servir para pagar proveedores?',
        answer: 'Puede servir para evaluar una necesidad puntual de caja si tienes cupo internacional disponible y entiendes los costos. La decisión debe tomarse después de revisar la cotización y tu capacidad de pago posterior.',
      },
      {
        question: '¿Puedo usar una tarjeta personal para una necesidad del negocio?',
        answer: 'Muchos dueños de negocios pequeños mezclan flujo personal y comercial. Antes de decidir, es importante entender costos, fechas de facturación, pago posterior de la tarjeta y efectos contables o tributarios si corresponde.',
      },
      {
        question: '¿Cuánto puedo recibir en pesos?',
        answer: 'Depende del monto de cupo internacional disponible, banco, tarjeta, tipo de cambio, costos de procesamiento, margen del servicio y condiciones vigentes. Por eso se entrega una cotización previa.',
      },
      {
        question: '¿Cuánto demora?',
        answer: 'Depende del banco, tarjeta, monto y validaciones. Evitamos prometer un plazo único porque lo responsable es revisar cada caso antes de confirmar.',
      },
      {
        question: '¿Conviene más que un crédito o factoring?',
        answer: 'No siempre. Depende del monto, urgencia, costo, plazo, facturas disponibles y capacidad de pago. Esta página no reemplaza asesoría financiera; busca ayudarte a entender cuándo cotizar puede tener sentido.',
      },
      {
        question: '¿Sirve para empresas grandes?',
        answer: 'No es el foco principal. La página está pensada para negocios, empresas pequeñas, emprendimientos y PyMEs con necesidades puntuales de caja.',
      },
      {
        question: '¿Atienden regiones?',
        answer: 'Sí. La atención es por WhatsApp, por lo que puedes cotizar de forma remota desde distintas ciudades de Chile.',
      },
    ],
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
    faqs: [
      {
        question: '¿Qué significa avance cupo en dólares online?',
        answer: 'Es una búsqueda que muchas personas usan cuando quieren recibir pesos usando el cupo internacional de su tarjeta. EnPesos no ofrece un avance bancario tradicional; ayuda a cotizar una operación con cupo en dólares disponible.',
      },
      {
        question: '¿Es lo mismo que un avance en efectivo?',
        answer: 'No. Un avance en efectivo es un producto del banco o emisor. EnPesos no es banco, no entrega préstamos ni créditos, y no define las condiciones bancarias posteriores.',
      },
      {
        question: '¿Es lo mismo un avance con tarjeta de crédito que usar el cupo en dólares?',
        answer: 'No son lo mismo. Un avance con tarjeta de crédito es una operación que ofrece directamente tu banco, generalmente con comisiones e intereses definidos por ellos. Usar el cupo en dólares disponible en tu tarjeta es distinto: no es un avance bancario tradicional, no es un préstamo ni un crédito. Es una operación asistida donde cotizas cuántos pesos chilenos podrías recibir usando el cupo internacional que ya tienes disponible. Antes de avanzar, ves el monto estimado, el costo y las condiciones. Si la operación se confirma, puede generarse un cargo o deuda en tu tarjeta según tu banco o emisor.',
      },
      {
        question: '¿Qué debo comparar antes de decidir?',
        answer: 'Compara monto neto en pesos, costo total, plazo, condiciones del banco o emisor, capacidad de pago y qué cargo o deuda quedará después en la tarjeta.',
      },
      {
        question: '¿Puede generarse deuda en mi tarjeta?',
        answer: 'Sí. Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de crédito, según las condiciones de tu banco o emisor.',
      },
      {
        question: '¿Cotizar me obliga a operar?',
        answer: 'No. Cotizar sirve para revisar cuánto podrías recibir en pesos, costo y condiciones antes de decidir. Si no te hace sentido, no tienes obligación de avanzar.',
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
    extraSections: [
      {
        heading: 'Qué simula exactamente esta herramienta',
        paragraphs: [
          'El simulador calcula, a partir de supuestos que tú defines, cuántos meses podrías tardar en pagar un monto de tarjeta si mantienes un pago mensual parecido al primero, defines un pago fijo o eliges un plazo objetivo. Usa un monto inicial en dólares convertido a pesos, un dólar de referencia y una tasa mensual, todos editables.',
          'No es una cotización ni un cálculo oficial de tu banco o emisor. Es una herramienta referencial para que veas el escenario completo de pago antes de decidir, no solo cuánto podrías recibir hoy.',
        ],
      },
      {
        heading: 'Para qué sirve entender los escenarios de pago posterior',
        paragraphs: [
          'Muchas personas miran solo el monto que podrían recibir hoy y no revisan cuánto tiempo o cuánto interés total podría tomar pagar después. Los distintos escenarios del simulador —pago referencial, pago fijo, plazo objetivo o pago total— muestran cómo cambia el tiempo y el costo total según la decisión de pago que tomes.',
          'Comparar escenarios antes de decidir ayuda a entender si tu presupuesto puede asumir el pago mensual estimado, sin comprometerte a un plazo que después no puedas cumplir.',
        ],
      },
      {
        heading: 'Cómo se relaciona esto con la deuda que puede generarse al usar cupo internacional',
        paragraphs: [
          'Si decides avanzar y cotizas una operación usando el cupo internacional disponible de tu tarjeta, y la operación se confirma, puede generarse un cargo o deuda posterior en tu tarjeta de crédito, según las condiciones de tu banco o emisor. El simulador te ayuda a estimar cómo podría verse ese pago en el tiempo, con distintos supuestos de tasa y pago mensual.',
          'El simulador no reemplaza la información oficial de tu banco o emisor sobre fecha de facturación, tipo de cambio, pago mínimo o intereses reales aplicados a tu tarjeta. Esos datos siempre debes confirmarlos directamente con tu banco o emisor.',
        ],
      },
      {
        heading: 'Qué supuestos puedes ajustar',
        paragraphs: [
          'Puedes cambiar el monto en dólares a simular, el dólar de referencia, el porcentaje de pago referencial y la tasa mensual estimada. Cada ajuste cambia el resultado, por lo que conviene probar más de un escenario antes de sacar conclusiones.',
          'El resultado siempre es una estimación con los supuestos que tú ingresaste, no una proyección exacta de lo que facturará tu banco o emisor.',
        ],
      },
      {
        heading: 'Qué hacer después de simular',
        paragraphs: [
          'Si el escenario simulado te ayuda a entender que podrías asumir el pago posterior, puedes solicitar una cotización real por WhatsApp para revisar cuánto podrías recibir en pesos, el costo y las condiciones antes de decidir. Cotizar no te obliga a avanzar.',
          'Si el escenario simulado muestra un pago que no podrías asumir, lo responsable es no avanzar con la operación y revisar otras alternativas.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿Esta simulación es una cotización real?',
        answer: 'No. La simulación usa supuestos que tú defines, como dólar referencial y tasa mensual estimada. No reemplaza la información oficial de tu banco o emisor ni una cotización real de EnPesos.',
      },
      {
        question: '¿Qué escenarios puedo simular?',
        answer: 'Puedes simular mantener un pago mensual referencial, definir un pago fijo mensual, elegir un plazo objetivo en meses o pagar el total facturado de una vez.',
      },
      {
        question: '¿El simulador me dice cuánto voy a pagar de verdad?',
        answer: 'No exactamente. El resultado depende de los supuestos que ingreses. El pago, la tasa, el tipo de cambio y la fecha de facturación reales dependen de las condiciones de tu banco o emisor.',
      },
      {
        question: '¿Simular me obliga a cotizar con EnPesos?',
        answer: 'No. Puedes usar el simulador solo para entender escenarios de pago, sin que eso te obligue a pedir una cotización ni a avanzar con una operación.',
      },
      {
        question: '¿Qué pasa si uso mi cupo internacional y no pago el total facturado?',
        answer: 'Si no pagas el total facturado, pueden aplicarse pago mínimo, intereses u otros cargos definidos por tu banco o emisor, según las condiciones de tu tarjeta.',
      },
    ],
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
  {
    slug: 'puente-alto',
    city: 'Puente Alto',
    region: 'Región Metropolitana',
    title: 'Cupo en dólares desde Puente Alto | Cotiza a pesos chilenos',
    description: 'Cotiza desde Puente Alto cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. Proceso asistido, sin claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde Puente Alto',
  },
  {
    slug: 'vitacura',
    city: 'Vitacura',
    region: 'Región Metropolitana',
    title: 'Cupo en dólares desde Vitacura | Cotiza a pesos chilenos',
    description: 'Cotiza desde Vitacura cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. Proceso asistido, sin claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde Vitacura',
  },
  {
    slug: 'quillota',
    city: 'Quillota',
    region: 'Región de Valparaíso',
    title: 'Cupo en dólares desde Quillota | Cotiza a pesos chilenos',
    description: 'Cotiza desde Quillota cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. Proceso asistido, sin claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde Quillota',
  },
  {
    slug: 'lo-barnechea',
    city: 'Lo Barnechea',
    region: 'Región Metropolitana',
    title: 'Cupo en dólares desde Lo Barnechea | Cotiza a pesos chilenos',
    description: 'Cotiza desde Lo Barnechea cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. Proceso asistido, sin claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde Lo Barnechea',
  },
  {
    slug: 'iquique',
    city: 'Iquique',
    region: 'Región de Tarapacá',
    title: 'Cupo en dólares desde Iquique | Cotiza a pesos chilenos',
    description: 'Cotiza desde Iquique cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. No somos casa de cambio ni pedimos claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde Iquique',
  },
  {
    slug: 'la-serena',
    city: 'La Serena',
    region: 'Región de Coquimbo',
    title: 'Cupo en dólares desde La Serena | Cotiza a pesos chilenos',
    description: 'Cotiza desde La Serena cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. Proceso asistido, sin claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde La Serena',
  },
  {
    slug: 'arica',
    city: 'Arica',
    region: 'Región de Arica y Parinacota',
    title: 'Cupo en dólares desde Arica | Cotiza a pesos chilenos',
    description: 'Desde Arica, cotiza cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. Con costo claro antes de decidir.',
    h1: 'Cupo en dólares a pesos chilenos desde Arica',
  },
];

function buildCityDeepDive(cityName) {
  return [
    {
      heading: `Qué es el cupo internacional que puedes cotizar desde ${cityName}`,
      paragraphs: [
        'El cupo internacional es un monto en dólares que muchos bancos y emisores aprueban dentro de la misma tarjeta de crédito, pensado originalmente para compras en el extranjero o en sitios que facturan en dólares.',
        `Si vives en ${cityName} y no usas ese cupo con frecuencia, puede quedar disponible sin utilizarse. EnPesos te ayuda a evaluar una operación asistida para que, si decides avanzar y la operación se confirma, ese cupo se traduzca en una transferencia en pesos en tu cuenta bancaria validada, revisando primero tu caso antes de avanzar.`,
      ],
    },
    {
      heading: 'Cómo se revisa tu caso antes de dar una cotización',
      paragraphs: [
        `Cada solicitud se evalúa de forma individual, sin importar si escribes desde ${cityName} u otra ciudad, porque el monto final depende del tipo de tarjeta, el banco o emisor, el cupo internacional disponible en el momento y los costos de procesamiento asociados.`,
        'Por eso no se entrega un monto neto automático ni una tasa fija en esta página: lo responsable es pedir una cotización real para tu caso y revisarla con calma antes de decidir.',
      ],
    },
    {
      heading: 'Qué información se pide y qué no se pide',
      paragraphs: [
        'Para orientar una cotización normalmente se piden datos básicos, como nombre, un medio de contacto, el banco o tipo de tarjeta y el monto aproximado que quieres evaluar.',
        'EnPesos no pide clave bancaria, clave de internet, token, coordenadas, códigos de verificación ni acceso remoto a tu celular o computador, y tampoco solicita el CVV por WhatsApp. Si alguien te pide esa información a nombre de EnPesos, no se la entregues y verifica que estás usando un canal oficial enlazado desde este sitio.',
      ],
    },
    {
      heading: 'Qué pasa con tu tarjeta después de una operación',
      paragraphs: [
        'Si decides avanzar y la operación se confirma, puede generarse un cargo o deuda posterior en tu tarjeta de crédito. Ese cargo depende de las condiciones de tu banco o emisor: fecha de facturación, tipo de cambio aplicado, pago mínimo e intereses si no pagas el total facturado.',
        'EnPesos no define esas condiciones ni puede anticipar un tiempo exacto de revisión, porque cada caso y cada tarjeta son distintos.',
      ],
    },
    {
      heading: 'Antes de decidir, compara con calma',
      paragraphs: [
        'Antes de aceptar una cotización, tiene sentido comparar el monto estimado con otras alternativas que puedas tener, revisar tu capacidad de pago y confirmar que entiendes cómo se reflejará el cargo en tu próximo estado de cuenta.',
        `Vivas en ${cityName} o en otra ciudad, la información que recibes es la misma: cotización previa, costo claro y una decisión que no te obliga a avanzar. Si en algún momento una operación no puede completarse, se detiene el proceso y se revisa el caso antes de cualquier paso siguiente.`,
      ],
    },
  ];
}

function buildCityFaqs(cityName) {
  return [
    {
      question: `¿Puedo cotizar mi cupo en dólares desde ${cityName}?`,
      answer: `Sí. Si estás en ${cityName} y tienes cupo internacional disponible en tu tarjeta, puedes solicitar una cotización para revisar cuántos pesos chilenos podrías recibir en tu cuenta. La revisión depende del banco, emisor, monto, cupo disponible y condiciones del caso.`,
    },
    {
      question: '¿EnPesos tiene oficina local?',
      answer: 'No declaramos oficina física local si no está documentada. La cotización se realiza por los canales oficiales enlazados desde enpesos.cl, con atención humana y explicación previa antes de decidir.',
    },
    {
      question: '¿EnPesos es una casa de cambio?',
      answer: 'No. EnPesos no es una casa de cambio, no compra ni vende divisas como actividad cambiaria y no entrega dinero físico. Ayuda a cotizar cuántos pesos chilenos podrías recibir usando cupo internacional disponible de tu tarjeta.',
    },
    {
      question: '¿Recibo transferencia en pesos chilenos?',
      answer: 'Si decides avanzar y la operación se confirma, el objetivo es que recibas una transferencia en pesos en tu cuenta bancaria validada. Primero revisas la cotización y decides si te hace sentido.',
    },
    {
      question: '¿Queda un cargo o deuda en mi tarjeta?',
      answer: 'Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de crédito, según las condiciones de tu banco o emisor. El pago posterior, facturación, intereses o comisiones dependen de esas condiciones.',
    },
    {
      question: '¿Qué datos no debo entregar?',
      answer: 'No entregues claves bancarias, token, coordenadas, contraseñas, CVV por WhatsApp ni acceso remoto a tus dispositivos. Si alguien te pide esos datos, detente y usa solo canales oficiales enlazados desde enpesos.cl.',
    },
  ];
}

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
    extraSections: buildCityDeepDive(route.city),
    faqs: buildCityFaqs(route.city),
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

function buildBankFaqs(name) {
  return [
    {
      question: `¿Puedo cotizar cupo en dólares con ${name}?`,
      answer: `Puedes solicitar una revisión por WhatsApp si tienes cupo internacional disponible. La cotización depende de ${name}, el banco o emisor cuando corresponda, la marca de tarjeta, el monto y las condiciones del caso.`,
    },
    {
      question: `¿EnPesos.cl trabaja oficialmente con ${name}?`,
      answer: `No. EnPesos.cl no representa a ${name}, no es banco ni emisor de tarjetas, y solo ofrece una cotización asistida por WhatsApp para evaluar cupo internacional disponible.`,
    },
    {
      question: '¿Cotizar me obliga a avanzar?',
      answer: 'No. Primero recibes una cotización previa y puedes revisar monto estimado, costos y condiciones. Solo decides avanzar si la información te hace sentido.',
    },
    {
      question: '¿Qué información se revisa para cotizar?',
      answer: 'Normalmente se revisa banco o tarjeta, monto aproximado, cupo internacional disponible, marca de tarjeta y datos básicos de contacto. No se solicitan claves bancarias ni acceso a cuentas.',
    },
    {
      question: '¿El monto en pesos es igual para todos los bancos o tarjetas?',
      answer: 'No. El monto puede variar según banco, emisor, marca de tarjeta, monto, costos, tipo de cambio, límites y condiciones del momento.',
    },
  ];
}

const bankDeepDiveMap = {
  'banco-estado': [
    {
      heading: 'Cómo verificar tu cupo internacional disponible en BancoEstado',
      paragraphs: [
        'Si tienes una tarjeta de crédito BancoEstado, normalmente puedes revisar el cupo internacional disponible en tu banca en línea, en la aplicación del banco o en tu estado de cuenta, dentro de la información asociada a la tarjeta. Si no encuentras esa información con claridad, lo más seguro es consultarla directamente con BancoEstado antes de cotizar.',
        'EnPesos no tiene acceso a tu cuenta ni puede confirmar por ti cuánto cupo internacional aparece disponible; esa información siempre la entrega tu banco.',
      ],
    },
    {
      heading: 'Cómo funciona el proceso si tu tarjeta es BancoEstado',
      paragraphs: [
        'El proceso de cotización es el mismo que para otras tarjetas: nos indicas que tienes una tarjeta BancoEstado con cupo internacional disponible y el monto aproximado que quieres evaluar. Revisamos información básica del caso y te entregamos una cotización previa con el monto estimado en pesos, antes de que decidas avanzar.',
        'EnPesos no tiene convenio ni representación oficial con BancoEstado; la revisión depende del caso, el cupo disponible y las condiciones informadas al momento de cotizar.',
      ],
    },
    {
      heading: 'Qué pasa con la deuda posterior si tu tarjeta es BancoEstado',
      paragraphs: [
        'Si decides avanzar y la operación se confirma, puede generarse un cargo o deuda posterior en tu tarjeta de crédito, según las condiciones de tu banco o emisor. La fecha de facturación, el tipo de cambio aplicado, el pago mínimo y los intereses en caso de no pagar el total dependen de las condiciones que informe BancoEstado para tu tarjeta.',
        'EnPesos no define esas condiciones ni puede anticipar un tiempo exacto de facturación o revisión. Esa información siempre debes confirmarla directamente con BancoEstado.',
      ],
    },
    {
      heading: 'Antes de escribir por WhatsApp si tu tarjeta es BancoEstado',
      paragraphs: [
        'Antes de cotizar, revisa tu estado de cuenta o banca en línea para confirmar el cupo internacional disponible y si tienes cargos pendientes que podrían afectar tu capacidad de pago. Esta revisión previa ayuda a que la cotización que recibas tenga sentido con tu situación real.',
        'Si tienes dudas específicas sobre condiciones, límites o restricciones de tu tarjeta BancoEstado, la fuente más confiable siempre es el propio banco, no un tercero.',
      ],
    },
  ],
  santander: [
    {
      heading: 'Cómo verificar tu cupo internacional disponible en Santander',
      paragraphs: [
        'Si tienes una tarjeta de crédito Santander, normalmente puedes revisar el cupo internacional disponible en la banca en línea de Santander, en su aplicación o en tu estado de cuenta, dentro de la información asociada a la tarjeta. Si no logras identificarlo con claridad, lo más seguro es consultarlo directamente con Santander antes de cotizar.',
        'EnPesos no tiene acceso a tu cuenta ni puede confirmar por ti cuánto cupo internacional aparece disponible; esa información siempre la entrega tu banco.',
      ],
    },
    {
      heading: 'Cómo funciona el proceso si tu tarjeta es Santander',
      paragraphs: [
        'El proceso de cotización es el mismo que para otras tarjetas: nos indicas que tienes una tarjeta Santander con cupo internacional disponible y el monto aproximado que quieres evaluar. Revisamos información básica del caso y te entregamos una cotización previa con el monto estimado en pesos, antes de que decidas avanzar.',
        'EnPesos no tiene convenio ni representación oficial con Santander; la revisión depende del caso, el cupo disponible y las condiciones informadas al momento de cotizar.',
      ],
    },
    {
      heading: 'Qué pasa con la deuda posterior si tu tarjeta es Santander',
      paragraphs: [
        'Si decides avanzar y la operación se confirma, puede generarse un cargo o deuda posterior en tu tarjeta de crédito, según las condiciones de tu banco o emisor. La fecha de facturación, el tipo de cambio aplicado, el pago mínimo y los intereses en caso de no pagar el total dependen de las condiciones que informe Santander para tu tarjeta.',
        'EnPesos no define esas condiciones ni puede anticipar un tiempo exacto de facturación o revisión. Esa información siempre debes confirmarla directamente con Santander.',
      ],
    },
    {
      heading: 'Antes de escribir por WhatsApp si tu tarjeta es Santander',
      paragraphs: [
        'Antes de cotizar, revisa tu estado de cuenta o banca en línea para confirmar el cupo internacional disponible y si tienes cargos pendientes que podrían afectar tu capacidad de pago. Esta revisión previa ayuda a que la cotización que recibas tenga sentido con tu situación real.',
        'Si tienes dudas específicas sobre condiciones, límites o restricciones de tu tarjeta Santander, la fuente más confiable siempre es el propio banco, no un tercero.',
      ],
    },
  ],
};

for (const [slug, name, category] of bankRoutes) {
  routes.push({
    path: `/cupo-en-dolares-${slug}`,
    title: `Cupo en dólares ${name} | Cotiza por WhatsApp | EnPesos.cl`,
    description: `Cotiza cupo en dólares ${name} a pesos chilenos por WhatsApp. Revisión caso a caso, sin claves bancarias y sin relación oficial con bancos o marcas de tarjeta.`,
    h1: `Cupo en dólares ${name}: cotiza a pesos chilenos por WhatsApp`,
    category,
    intro: `Si tienes una tarjeta ${name} con cupo internacional disponible, puedes solicitar una cotización asistida por WhatsApp. EnPesos no representa a ${name}; la revisión depende del caso, monto, cupo disponible y condiciones informadas.`,
    points: [`Tarjeta o emisor ${name}`, 'Cupo internacional disponible', 'Cotización antes de avanzar', 'Sin claves bancarias ni acceso remoto'],
    ...(bankDeepDiveMap[slug] ? { extraSections: bankDeepDiveMap[slug], faqs: buildBankFaqs(name) } : {}),
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

  const faqContent = route.faqs
    ? `
        <section>
          <h2>Preguntas frecuentes</h2>
          ${route.faqs
            .map(
              (faq) => `<h3>${escapeHtml(faq.question)}</h3>
          <p>${escapeHtml(faq.answer)}</p>`,
            )
            .join('\n          ')}
        </section>`
    : '';

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
        ${faqContent}
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

  const faqSchema = route.faqs
    ? `
    <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: route.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    })}</script>`
    : '';

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
    })}</script>${faqSchema}`;

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
