👁️ Detecção de Deficiências Visuais com Teachable Machine
📝 Descrição do Projeto
Este projeto consiste no treinamento de um modelo de Machine Learning utilizando a plataforma Teachable Machine (Google), com o objetivo de classificar imagens de pessoas usando óculos e identificar se o indivíduo possui astigmatismo ou miopia, com base em características visuais das lentes e armações.
O modelo é treinado a partir de um conjunto de imagens organizadas em classes distintas, permitindo que a IA aprenda padrões visuais associados a cada condição — como a curvatura das lentes, a espessura das hastes e a distorção ótica perceptível nas fotografias.

🎯 Objetivo
Treinar uma rede neural de classificação de imagens capaz de:

Identificar pessoas com miopia — geralmente associada a lentes côncavas (mais grossas nas bordas)
Identificar pessoas com astigmatismo — associada a lentes cilíndricas com curvatura irregular
Distinguir entre as duas condições de forma automatizada, sem intervenção humana


🧠 Como Funciona o Treinamento
O processo segue as etapas padrão do Teachable Machine:

Coleta de Imagens — Fotos de pessoas usando óculos, separadas por diagnóstico (miopia / astigmatismo)
Organização por Classes — Cada condição representa uma classe distinta no modelo
Upload no Teachable Machine — As imagens são carregadas diretamente na plataforma
Treinamento — A plataforma utiliza Transfer Learning sobre o modelo MobileNet para ajustar os pesos com base nos dados fornecidos
Validação — O modelo é testado com imagens não vistas durante o treinamento
Exportação — O modelo treinado é exportado nos formatos TensorFlow.js, TensorFlow Lite ou Keras


🗂️ Estrutura do Dataset
dataset/
├── miopia/
│   ├── img_001.jpg
│   ├── img_002.jpg
│   └── ...
├── astigmatismo/
│   ├── img_001.jpg
│   ├── img_002.jpg
│   └── ...
└── sem_oculos/        # (opcional — classe neutra)
    ├── img_001.jpg
    └── ...

⚠️ Recomendação: Utilizar ao menos 50–100 imagens por classe para um resultado satisfatório.


🚀 Tecnologias Utilizadas
FerramentaFunçãoTeachable MachineTreinamento visual do modelo de MLTensorFlow.js / TensorFlow LiteExportação e deploy do modeloMobileNet (Transfer Learning)Arquitetura base da rede neuralJavaScript / PythonIntegração e inferência do modelo exportado

📦 Como Usar o Modelo Exportado
Via TensorFlow.js (Web)
html<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
<script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image"></script>

<script>
  const URL = "URL_DO_SEU_MODELO/";

  async function init() {
    const model = await tmImage.load(URL + "model.json", URL + "metadata.json");
    const prediction = await model.predict(imagemElement);
    console.log(prediction);
  }
</script>
Via Python (TensorFlow/Keras)
pythonimport tensorflow as tf
import numpy as np
from PIL import Image

model = tf.keras.models.load_model("keras_model.h5")
labels = open("labels.txt", "r").readlines()

img = Image.open("teste.jpg").resize((224, 224))
img_array = np.array(img) / 255.0
img_array = np.expand_dims(img_array, axis=0)

predictions = model.predict(img_array)
classe = labels[np.argmax(predictions)]
print(f"Diagnóstico previsto: {classe}")

⚠️ Limitações e Considerações Éticas

O modelo não substitui diagnóstico médico — serve apenas como demonstração educacional de ML aplicado à saúde visual
A acurácia depende diretamente da qualidade e quantidade das imagens de treinamento
Imagens com baixa resolução, óculos de sol ou armações incomuns podem reduzir a precisão
O uso de dados biométricos (faces) deve respeitar a LGPD e demais legislações de privacidade


📊 Resultados Esperados
MétricaValor Esperado (com dataset adequado)Acurácia de treinamento≥ 85%Acurácia de validação≥ 75%Tempo de inferência (JS)< 100ms

🤝 Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request com melhorias no dataset, no pipeline de treinamento ou na integração do modelo.

⬆ Voltar ao início
