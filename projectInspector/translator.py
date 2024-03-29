import json

from googletrans import Translator
translator = Translator()
test = translator.translate('taste', dest='de')
print(test.text)
newLang = 'de'

with open('../assets/json/EN.json') as f:
  data = json.load(f)

keys = list(data.keys())
translations = translator.translate(keys, src='en', dest='de')
for translation in translations:
  print(translation.text)
  data[translation.origin] = translation.text

f = open('./'+newLang+'.json', "w")

json.dump(data, f)