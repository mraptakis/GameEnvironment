import json

from googletrans import Translator
translator = Translator()
test = translator.translate('안녕하세요.', dest='ja',src='la')
print(test)
newLang = 'FR'

with open('../assets/json/EN.json') as f:
  data = json.load(f)

keys = data.keys()

f = open('./'+newLang+'.json', "w")

json.dump(data, f)