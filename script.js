

const ingredientInput = document.getElementById("ingredientInput");
const addIngredientButton = document.getElementById("addIngredient");
const ingredientList = document.getElementById("ingredientList");

const shoppingInput = document.getElementById("shoppingInput");
const addShoppingButton = document.getElementById("addShopping");
const shoppingList = document.getElementById("shoppingList");

const searchButton = document.getElementById("searchRecipes");
const recipeList = document.getElementById("recipeList");

let ingredients = JSON.parse(localStorage.getItem("ingredients") || "[]");
let shoppingItems = JSON.parse(localStorage.getItem("shoppingItems") || "[]");

// レシピデータ
const recipes = [
  {
    name: "たまごチャーハン",
    ingredients: ["たまご", "ごはん", "ねぎ"],
    price: 200,
    time: 10,
    description: "卵とごはんで作れる簡単メニュー！",
steps: [
    "卵をボウルに入れて溶く。",
    "フライパンで卵を炒める。",
    "ごはんを加えて、ほぐしながら炒める。",
    "塩こしょうで味を整えたら完成！"
]
  },
  {
    name: "オムライス",
    ingredients: ["たまご", "ごはん", "玉ねぎ", "ケチャップ"],
    price: 400,
    time: 25,
    description: "ふわふわ卵の定番メニュー！",
steps: [
    "玉ねぎを細かく切る。",
    "フライパンで玉ねぎを炒める。",
    "ごはんとケチャップを加えて炒める。",
    "別のフライパンで溶き卵を焼く。",
    "お皿にケチャップライスを盛り、卵をのせる。",
    "ケチャップをかけたら完成！"
]  },
  {
    name: "親子丼",
    ingredients: ["鶏肉", "たまご", "玉ねぎ", "ごはん"],
    price: 400,
    time: 20,
    description: "鶏肉と卵のやさしい味わい！",
steps: [
    "鶏肉と玉ねぎを食べやすい大きさに切る。",
    "フライパンに水と調味料を入れて温める。",
    "鶏肉と玉ねぎを加えて火を通す。",
    "溶き卵を回し入れて、ふたをする。",
    "卵にしっかり火が通ったら、ごはんにのせて完成！"
]  },
  {
    name: "牛丼",
    ingredients: ["牛肉", "玉ねぎ", "ごはん"],
    price: 500,
    time: 15,
    description: "甘辛い味付けでごはんが進む！"
  },
  {
    name: "豚丼",
    ingredients: ["豚肉", "玉ねぎ", "ごはん"],
    price: 450,
    time: 15,
    description: "豚肉を甘辛く焼いた丼！"
  },
  {
    name: "そぼろ丼",
    ingredients: ["ひき肉", "たまご", "ごはん"],
    price: 350,
    time: 15,
    description: "肉そぼろと卵の彩り丼！"
  },
  {
    name: "ツナマヨ丼",
    ingredients: ["ツナ", "マヨネーズ", "ごはん"],
    price: 250,
    time: 5,
    description: "混ぜるだけのお手軽丼！"
  },
  {
    name: "納豆ごはん",
    ingredients: ["納豆", "ごはん", "ねぎ"],
    price: 150,
    time: 5,
    description: "忙しい日にもぴったり！"
  },
  {
    name: "焼き鳥丼",
    ingredients: ["鶏肉", "ねぎ", "ごはん"],
    price: 400,
    time: 20,
    description: "香ばしい鶏肉の丼！"
  },
  {
    name: "麻婆丼",
    ingredients: ["豆腐", "ひき肉", "ねぎ", "ごはん"],
    price: 350,
    time: 15,
    description: "ピリ辛の麻婆豆腐をごはんに！"
  },
  {
    name: "カレーライス",
    ingredients: ["じゃがいも", "にんじん", "玉ねぎ", "肉", "ごはん"],
    price: 450,
    time: 30,
    description: "みんな大好き定番カレー！"
  },
  {
    name: "ドライカレー",
    ingredients: ["ひき肉", "玉ねぎ", "にんじん", "ごはん"],
    price: 400,
    time: 20,
    description: "具材を炒めて作るカレー！"
  },
  {
    name: "ガーリックライス",
    ingredients: ["ごはん", "にんにく", "ねぎ"],
    price: 200,
    time: 10,
    description: "にんにくの香りが食欲をそそる！"
  },
  {
    name: "チキンライス",
    ingredients: ["鶏肉", "玉ねぎ", "ごはん", "ケチャップ"],
    price: 350,
    time: 15,
    description: "ケチャップ味の簡単ごはん！"
  },
  {
    name: "キムチチャーハン",
    ingredients: ["キムチ", "ごはん", "たまご"],
    price: 250,
    time: 10,
    description: "ピリ辛で食べごたえのある炒飯！"
  },
  {
    name: "鮭フレーク丼",
    ingredients: ["鮭", "ごはん", "のり"],
    price: 300,
    time: 5,
    description: "鮭フレークをのせるだけ！"
  },
  {
    name: "照り焼きチキン丼",
    ingredients: ["鶏肉", "ごはん", "キャベツ"],
    price: 450,
    time: 20,
    description: "甘辛い照り焼きチキンの丼！"
  },
  {
    name: "豚キムチ丼",
    ingredients: ["豚肉", "キムチ", "ごはん"],
    price: 400,
    time: 15,
    description: "豚肉とキムチの相性ばっちり！"
  },
  {
    name: "卵かけごはん",
    ingredients: ["たまご", "ごはん", "しょうゆ"],
    price: 100,
    time: 5,
    description: "シンプルで手軽なごはん！"
  },
  {
    name: "野菜あんかけ丼",
    ingredients: ["にんじん", "キャベツ", "玉ねぎ", "ごはん"],
    price: 300,
    time: 20,
    description: "野菜たっぷりのあんかけ丼！"
  }
,
  {
    name: "ナポリタン",
    ingredients: ["パスタ", "玉ねぎ", "ピーマン", "ウインナー", "ケチャップ"],
    price: 350,
    time: 15,
    description: "ケチャップ味の定番パスタ！"
  },
  {
    name: "カルボナーラ",
    ingredients: ["パスタ", "たまご", "ベーコン", "牛乳", "チーズ"],
    price: 400,
    time: 20,
    description: "クリーミーで濃厚なパスタ！"
  },
  {
    name: "ミートソースパスタ",
    ingredients: ["パスタ", "ひき肉", "玉ねぎ", "トマト"],
    price: 400,
    time: 25,
    description: "お肉たっぷりの定番パスタ！"
  },
  {
    name: "和風きのこパスタ",
    ingredients: ["パスタ", "きのこ", "ベーコン", "しょうゆ"],
    price: 350,
    time: 15,
    description: "きのことしょうゆの和風パスタ！"
  },
  {
    name: "ツナパスタ",
    ingredients: ["パスタ", "ツナ", "玉ねぎ"],
    price: 300,
    time: 15,
    description: "ツナで手軽に作れるパスタ！"
  },
  {
    name: "ペペロンチーノ",
    ingredients: ["パスタ", "にんにく", "唐辛子", "オリーブオイル"],
    price: 250,
    time: 15,
    description: "にんにくの香りが楽しめるパスタ！"
  },
  {
    name: "明太子パスタ",
    ingredients: ["パスタ", "明太子", "バター", "のり"],
    price: 400,
    time: 15,
    description: "明太子とバターの人気パスタ！"
  },
  {
    name: "トマトパスタ",
    ingredients: ["パスタ", "トマト", "にんにく", "玉ねぎ"],
    price: 350,
    time: 20,
    description: "トマトの酸味がおいしいパスタ！"
  },
  {
    name: "焼きそば",
    ingredients: ["焼きそば麺", "キャベツ", "豚肉", "にんじん"],
    price: 300,
    time: 15,
    description: "ソース味の定番メニュー！"
  },
  {
    name: "塩焼きそば",
    ingredients: ["焼きそば麺", "キャベツ", "豚肉", "もやし"],
    price: 300,
    time: 15,
    description: "あっさり塩味の焼きそば！"
  },
  {
    name: "ソース焼きうどん",
    ingredients: ["うどん", "キャベツ", "豚肉", "玉ねぎ"],
    price: 300,
    time: 15,
    description: "ソース味で食べやすいうどん！"
  },
  {
    name: "釜玉うどん",
    ingredients: ["うどん", "たまご", "ねぎ", "しょうゆ"],
    price: 200,
    time: 10,
    description: "卵をからめて食べる簡単うどん！"
  },
  {
    name: "肉うどん",
    ingredients: ["うどん", "牛肉", "玉ねぎ", "ねぎ"],
    price: 400,
    time: 20,
    description: "甘辛いお肉をのせたうどん！"
  },
  {
    name: "きつねうどん",
    ingredients: ["うどん", "油揚げ", "ねぎ"],
    price: 250,
    time: 15,
    description: "甘く煮た油揚げのうどん！"
  },
  {
    name: "カレーうどん",
    ingredients: ["うどん", "カレー", "ねぎ", "玉ねぎ"],
    price: 350,
    time: 15,
    description: "カレー味のあたたかいうどん！"
  },
  {
    name: "冷やしそうめん",
    ingredients: ["そうめん", "ねぎ", "しょうが"],
    price: 200,
    time: 10,
    description: "暑い日にぴったりのそうめん！"
  },
  {
    name: "ラーメン風うどん",
    ingredients: ["うどん", "たまご", "ねぎ", "もやし"],
    price: 250,
    time: 15,
    description: "身近な材料で作るラーメン風うどん！"
  },
  {
    name: "クリームパスタ",
    ingredients: ["パスタ", "牛乳", "ベーコン", "チーズ"],
    price: 400,
    time: 20,
    description: "牛乳で作るまろやかなパスタ！"
  },
  {
    name: "キャベツとベーコンのパスタ",
    ingredients: ["パスタ", "キャベツ", "ベーコン", "にんにく"],
    price: 350,
    time: 15,
    description: "キャベツたっぷりのパスタ！"
  },
  {
    name: "そばの卵とじ",
    ingredients: ["そば", "たまご", "ねぎ"],
    price: 250,
    time: 15,
    description: "卵でふんわり仕上げる温かいそば！"
  },
  {
    name: "豚の生姜焼き",
    ingredients: ["豚肉", "玉ねぎ", "しょうが"],
    price: 400,
    time: 15,
    description: "しょうがの香りが食欲をそそる！"
  },
  {
    name: "鶏の照り焼き",
    ingredients: ["鶏肉", "しょうゆ", "みりん"],
    price: 400,
    time: 20,
    description: "甘辛い味付けの定番おかず！"
  },
  {
    name: "ハンバーグ",
    ingredients: ["ひき肉", "玉ねぎ", "たまご", "パン粉"],
    price: 450,
    time: 30,
    description: "ふっくらジューシーなハンバーグ！"
  },
  {
    name: "肉野菜炒め",
    ingredients: ["豚肉", "キャベツ", "にんじん", "もやし"],
    price: 350,
    time: 15,
    description: "野菜もお肉も食べられる一品！"
  },
  {
    name: "鶏そぼろ",
    ingredients: ["鶏ひき肉", "しょうゆ", "砂糖"],
    price: 300,
    time: 15,
    description: "ごはんにもよく合う甘辛そぼろ！"
  },
  {
    name: "豚キムチ炒め",
    ingredients: ["豚肉", "キムチ", "玉ねぎ"],
    price: 400,
    time: 15,
    description: "ピリ辛でごはんが進む！"
  },
  {
    name: "チキンカツ",
    ingredients: ["鶏肉", "たまご", "パン粉", "小麦粉"],
    price: 450,
    time: 25,
    description: "サクサク衣のチキンカツ！"
  },
  {
    name: "鶏肉の塩焼き",
    ingredients: ["鶏肉", "塩", "こしょう"],
    price: 350,
    time: 20,
    description: "シンプルな味付けでおいしい！"
  },
  {
    name: "豚肉の味噌炒め",
    ingredients: ["豚肉", "キャベツ", "みそ"],
    price: 400,
    time: 15,
    description: "味噌のコクが楽しめる炒め物！"
  },
  {
    name: "肉じゃが",
    ingredients: ["豚肉", "じゃがいも", "にんじん", "玉ねぎ"],
    price: 400,
    time: 30,
    description: "ほっとする家庭の味！"
  },
  {
    name: "鶏そぼろ丼",
    ingredients: ["鶏ひき肉", "たまご", "ごはん"],
    price: 350,
    time: 15,
    description: "鶏そぼろと卵の彩り丼！"
  },
  {
    name: "豚肉のポン酢炒め",
    ingredients: ["豚肉", "玉ねぎ", "ポン酢"],
    price: 350,
    time: 15,
    description: "さっぱりした味付け！"
  },
  {
    name: "鶏肉のトマト煮",
    ingredients: ["鶏肉", "トマト", "玉ねぎ"],
    price: 450,
    time: 30,
    description: "トマトのうまみたっぷり！"
  },
  {
    name: "ミートボール",
    ingredients: ["ひき肉", "たまご", "パン粉", "ケチャップ"],
    price: 400,
    time: 25,
    description: "ケチャップ味の食べやすいおかず！"
  },
  {
    name: "鶏肉のマヨ焼き",
    ingredients: ["鶏肉", "マヨネーズ", "こしょう"],
    price: 350,
    time: 20,
    description: "マヨネーズでコクのある味わい！"
  },
  {
    name: "豚肉とピーマン炒め",
    ingredients: ["豚肉", "ピーマン", "しょうゆ"],
    price: 350,
    time: 15,
    description: "手軽に作れる炒め物！"
  },
  {
    name: "タンドリーチキン風",
    ingredients: ["鶏肉", "ヨーグルト", "カレー粉"],
    price: 400,
    time: 25,
    description: "カレー風味のスパイシーな鶏肉！"
  },
  {
    name: "豚肉と白菜の蒸し煮",
    ingredients: ["豚肉", "白菜", "ポン酢"],
    price: 350,
    time: 20,
    description: "白菜の甘みを楽しめる一品！"
  },
  {
    name: "鶏つくね",
    ingredients: ["鶏ひき肉", "たまご", "ねぎ", "しょうゆ"],
    price: 400,
    time: 25,
    description: "ふんわりした鶏つくね！"
  },
  {
    name: "豚肉のケチャップ炒め",
    ingredients: ["豚肉", "玉ねぎ", "ケチャップ"],
    price: 350,
    time: 15,
    description: "甘酸っぱい味付けで食べやすい！"
  },
  {
    name: "野菜炒め",
    ingredients: ["キャベツ", "にんじん", "もやし", "ピーマン"],
    price: 250,
    time: 10,
    description: "冷蔵庫の野菜で作れる簡単おかず！"
  },
  {
    name: "ほうれん草の卵炒め",
    ingredients: ["ほうれん草", "たまご"],
    price: 250,
    time: 10,
    description: "彩りもきれいな卵炒め！"
  },
  {
    name: "ニラ玉",
    ingredients: ["ニラ", "たまご"],
    price: 200,
    time: 10,
    description: "ニラと卵のシンプルなおかず！"
  },
  {
    name: "キャベツの塩炒め",
    ingredients: ["キャベツ", "にんにく"],
    price: 150,
    time: 10,
    description: "キャベツの甘みがおいしい！"
  },
  {
    name: "もやしの卵とじ",
    ingredients: ["もやし", "たまご", "ねぎ"],
    price: 150,
    time: 10,
    description: "身近な材料で作れる一品！"
  },
  {
    name: "ピーマンの卵炒め",
    ingredients: ["ピーマン", "たまご"],
    price: 200,
    time: 10,
    description: "手軽に作れる彩りおかず！"
  },
  {
    name: "じゃがいものガレット",
    ingredients: ["じゃがいも", "チーズ"],
    price: 250,
    time: 15,
    description: "カリッと焼いたじゃがいも料理！"
  },
  {
    name: "野菜オムレツ",
    ingredients: ["たまご", "玉ねぎ", "にんじん", "ピーマン"],
    price: 300,
    time: 15,
    description: "野菜を入れたふんわりオムレツ！"
  },
  {
    name: "トマトと卵の炒め物",
    ingredients: ["トマト", "たまご"],
    price: 250,
    time: 10,
    description: "トマトの酸味と卵がよく合う！"
  },
  {
    name: "小松菜のおひたし",
    ingredients: ["小松菜", "しょうゆ"],
    price: 150,
    time: 10,
    description: "さっぱり食べられる副菜！"
  },
  {
    name: "にんじんしりしり",
    ingredients: ["にんじん", "たまご"],
    price: 150,
    time: 10,
    description: "にんじんと卵の炒め物！"
  },
  {
    name: "キャベツの卵焼き",
    ingredients: ["キャベツ", "たまご"],
    price: 200,
    time: 10,
    description: "キャベツ入りのふんわり卵焼き！"
  },
  {
    name: "なすの味噌炒め",
    ingredients: ["なす", "みそ", "ねぎ"],
    price: 250,
    time: 15,
    description: "味噌の味がしみた野菜おかず！"
  },
  {
    name: "ブロッコリーのチーズ焼き",
    ingredients: ["ブロッコリー", "チーズ"],
    price: 250,
    time: 15,
    description: "チーズをのせて焼く簡単料理！"
  },
  {
    name: "野菜たっぷり卵焼き",
    ingredients: ["たまご", "にんじん", "ねぎ"],
    price: 250,
    time: 15,
    description: "野菜を混ぜ込んだ卵焼き！"
  },
  {
    name: "たまごスープ",
    ingredients: ["たまご", "ねぎ", "鶏ガラスープの素"],
    price: 150,
    time: 10,
    description: "ふんわり卵のやさしいスープ！"
  },
  {
    name: "わかめスープ",
    ingredients: ["わかめ", "ねぎ", "鶏ガラスープの素"],
    price: 100,
    time: 5,
    description: "すぐに作れる定番スープ！"
  },
  {
    name: "野菜スープ",
    ingredients: ["キャベツ", "にんじん", "玉ねぎ"],
    price: 200,
    time: 15,
    description: "野菜をたっぷり使ったスープ！"
  },
  {
    name: "コンソメスープ",
    ingredients: ["玉ねぎ", "にんじん", "コンソメ"],
    price: 150,
    time: 10,
    description: "コンソメ味のシンプルスープ！"
  },
  {
    name: "豆腐とわかめの味噌汁",
    ingredients: ["豆腐", "わかめ", "みそ"],
    price: 150,
    time: 10,
    description: "ほっとする定番の味噌汁！"
  },
  {
    name: "ミネストローネ",
    ingredients: ["トマト", "玉ねぎ", "にんじん", "キャベツ"],
    price: 250,
    time: 20,
    description: "トマト味の具だくさんスープ！"
  },
  {
    name: "コーンスープ",
    ingredients: ["コーン", "牛乳", "コンソメ"],
    price: 200,
    time: 10,
    description: "コーンの甘みがおいしいスープ！"
  },
  {
    name: "きのこスープ",
    ingredients: ["きのこ", "玉ねぎ", "コンソメ"],
    price: 200,
    time: 15,
    description: "きのこのうまみたっぷり！"
  },
  {
    name: "白菜と卵のスープ",
    ingredients: ["白菜", "たまご", "鶏ガラスープの素"],
    price: 200,
    time: 10,
    description: "白菜と卵のあったかスープ！"
  },
  {
    name: "じゃがいものポタージュ",
    ingredients: ["じゃがいも", "牛乳", "玉ねぎ"],
    price: 250,
    time: 20,
    description: "じゃがいものなめらかなスープ！"
  },
  {
    name: "冷ややっこ",
    ingredients: ["豆腐", "ねぎ", "しょうゆ"],
    price: 100,
    time: 5,
    description: "火を使わずに作れる簡単おかず！"
  },
  {
    name: "納豆オムレツ",
    ingredients: ["納豆", "たまご"],
    price: 200,
    time: 10,
    description: "納豆入りのふんわりオムレツ！"
  },
  {
    name: "ポテトサラダ",
    ingredients: ["じゃがいも", "にんじん", "マヨネーズ"],
    price: 250,
    time: 20,
    description: "ほくほくじゃがいもの定番サラダ！"
  },
  {
    name: "きゅうりの浅漬け",
    ingredients: ["きゅうり", "塩"],
    price: 100,
    time: 5,
    description: "さっぱり食べられる簡単副菜！"
  },
  {
    name: "もやしナムル",
    ingredients: ["もやし", "ごま油", "しょうゆ"],
    price: 100,
    time: 5,
    description: "ごま油の香りがおいしい！"
  },
  {
    name: "だし巻き卵",
    ingredients: ["たまご", "だし"],
    price: 150,
    time: 10,
    description: "だしの風味が広がる卵料理！"
  },
  {
    name: "ちくわの磯辺焼き",
    ingredients: ["ちくわ", "青のり", "小麦粉"],
    price: 150,
    time: 10,
    description: "青のりの香りが楽しめる一品！"
  },
  {
    name: "豆腐ステーキ",
    ingredients: ["豆腐", "しょうゆ", "ねぎ"],
    price: 150,
    time: 15,
    description: "焼いた豆腐に味をつけたおかず！"
  },
  {
    name: "ツナサラダ",
    ingredients: ["ツナ", "キャベツ", "コーン"],
    price: 200,
    time: 5,
    description: "混ぜるだけの簡単サラダ！"
  },
  {
    name: "アボカドサラダ",
    ingredients: ["アボカド", "トマト", "レタス"],
    price: 300,
    time: 10,
    description: "彩り豊かなサラダ！"
  },
  {
    name: "厚揚げの甘辛焼き",
    ingredients: ["厚揚げ", "しょうゆ", "みりん"],
    price: 200,
    time: 10,
    description: "甘辛い味付けのボリュームおかず！"
  },
  {
    name: "キャベツのツナ和え",
    ingredients: ["キャベツ", "ツナ", "マヨネーズ"],
    price: 200,
    time: 10,
    description: "キャベツとツナを和えるだけ！"
  },
  {
    name: "ブロッコリーのごま和え",
    ingredients: ["ブロッコリー", "ごま", "しょうゆ"],
    price: 200,
    time: 10,
    description: "ごまの風味がおいしい副菜！"
  },
  {
    name: "ウインナーと野菜の炒め物",
    ingredients: ["ウインナー", "ピーマン", "玉ねぎ"],
    price: 250,
    time: 10,
    description: "冷蔵庫の材料で作れる炒め物！"
  },
  {
    name: "じゃがバター",
    ingredients: ["じゃがいも", "バター"],
    price: 150,
    time: 10,
    description: "バターの香りが楽しめる一品！"
  }];
// 作り方が登録されていないレシピにも、料理の種類に合わせて手順を表示する
function getRecipeSteps(recipe) {
  const name = recipe.name;
  if (recipe.steps) {
    return recipe.steps;
}
  if (/スープ|味噌汁|みそ汁|ポタージュ|ミネストローネ/.test(name)) {
    return [
      "材料を食べやすい大きさに切る。",
      "鍋に水やスープの材料、火の通りにくい具材を入れて温める。",
      "具材がやわらかくなるまで煮る。",
      "味を整え、器に盛りつけたら完成！"
    ];
  }

  if (/パスタ|ナポリタン|カルボナーラ|ペペロンチーノ/.test(name)) {
    return [
      "鍋に湯を沸かし、パスタを袋の表示時間を目安にゆでる。",
      "具材を食べやすい大きさに切り、フライパンで炒める。",
      "ゆでたパスタと調味料を加えて、全体をよく混ぜる。",
      "味を整えて、お皿に盛りつけたら完成！"
    ];
  }

  if (/うどん|そば|そうめん|ラーメン/.test(name)) {
    return [
      "具材を食べやすい大きさに切る。",
      "麺を袋の表示に合わせてゆでる、または温める。",
      "鍋や器にだし・つゆを用意し、具材を加えて火を通す。",
      "麺と合わせ、器に盛りつけたら完成！"
    ];
  }

  if (/丼|ごはん|チャーハン|カレーライス|ドライカレー/.test(name)) {
    return [
      "材料を食べやすい大きさに切る。",
      "フライパンや鍋で具材を炒め、必要な調味料を加える。",
      "肉や卵などを使う場合は、中までしっかり火を通す。",
      "温かいごはんにのせる、またはごはんと混ぜたら完成！"
    ];
  }

  if (/生姜焼き|照り焼き|ハンバーグ|カツ|そぼろ|肉|チキン|つくね|ミートボール/.test(name)) {
    return [
      "材料を食べやすい大きさに切る。ひき肉料理は材料と調味料をよく混ぜる。",
      "フライパンに油を少量ひき、具材を並べて中火で加熱する。",
      "裏返して反対側も焼き、肉の中心までしっかり火を通す。",
      "調味料をからめて味を整え、お皿に盛りつけたら完成！"
    ];
  }

  if (/卵|たまご|オムレツ|ニラ玉|ガレット/.test(name)) {
    return [
      "野菜などの材料を食べやすい大きさに切る。",
      "ボウルに卵を割り入れ、必要に応じて塩などを加えて溶く。",
      "フライパンで具材を炒め、卵を加えて形を整えながら加熱する。",
      "卵にしっかり火が通ったら、お皿に盛りつけて完成！"
    ];
  }

  if (/サラダ|おひたし|浅漬け|ナムル|冷ややっこ/.test(name)) {
    return [
      "野菜を洗い、食べやすい大きさに切る。",
      "必要な材料は、袋や説明に合わせてゆでるなど下ごしらえをする。",
      "調味料を加えて、全体をよく混ぜ合わせる。",
      "器に盛りつけたら完成！"
    ];
  }

  return [
    "材料を洗い、食べやすい大きさに切る。",
    "フライパンや鍋に材料を入れ、焦げないように様子を見ながら加熱する。",
    "調味料を加えて味を整え、材料にしっかり火を通す。",
    "器に盛りつけたら完成！"
  ];
}
// リスト表示
function showList(items, listElement, storageKey) {
  listElement.innerHTML = "";

  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item + " ";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", () => {
      items.splice(index, 1);
      localStorage.setItem(storageKey, JSON.stringify(items));
      showList(items, listElement, storageKey);
    });

    li.appendChild(deleteButton);
    listElement.appendChild(li);
  });
}

// 食材を追加
addIngredientButton.addEventListener("click", () => {
  const ingredient = ingredientInput.value.trim();

  if (!ingredient) {
    alert("食材を入力してね！");
    return;
  }

  ingredients.push(ingredient);
  localStorage.setItem("ingredients", JSON.stringify(ingredients));
  ingredientInput.value = "";
  showList(ingredients, ingredientList, "ingredients");
});

// 買い物リストに追加
addShoppingButton.addEventListener("click", () => {
  const item = shoppingInput.value.trim();

  if (!item) {
    alert("買うものを入力してね！");
    return;
  }

  shoppingItems.push(item);
  localStorage.setItem("shoppingItems", JSON.stringify(shoppingItems));
  shoppingInput.value = "";
  showList(shoppingItems, shoppingList, "shoppingItems");
});

// レシピ検索
searchButton.addEventListener("click", () => {
  const budget = Number(document.getElementById("budget").value);
  const cookTime = Number(document.getElementById("cookTime").value);
  const genre = document.getElementById("genre").value;　
  recipeList.innerHTML = "";

  const matchedRecipes = recipes.filter(recipe => {
    const hasIngredient = recipe.ingredients.some(item =>
      ingredients.includes(item)
    );
  const recipeText = recipe.name + recipe.ingredients.join(" ");

let recipeGenre = "side";

if (/スープ|味噌汁|みそ汁|ポタージュ/.test(recipeText)) {
    recipeGenre = "soup";
} else if (/パスタ|うどん|そば|ラーメン|焼きそば|そうめん/.test(recipeText)) {
    recipeGenre = "noodles";
} else if (/ごはん|チャーハン|丼|おにぎり|雑炊/.test(recipeText)) {
    recipeGenre = "rice";
} else if (/鶏肉|豚肉|牛肉|ひき肉|ベーコン/.test(recipeText)) {
    recipeGenre = "meat";
} else if (/卵|たまご|キャベツ|にんじん|玉ねぎ|野菜/.test(recipeText)) {
    recipeGenre = "vegetables";
}return hasIngredient &&
    recipe.price <= budget &&
    recipe.time <= cookTime &&
    (genre === "all" || recipeGenre === genre);
});
  if (matchedRecipes.length === 0) {
    recipeList.textContent =
      "条件に合うレシピが見つからなかったよ。食材や条件を変えてみてね！";
    return;
  }

  matchedRecipes.forEach(recipe => {
    const card = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = "🍽️ " + recipe.name;

    const description = document.createElement("p");
    description.textContent = recipe.description;

    const info = document.createElement("p");
    info.textContent =
      "目安：約" + recipe.price + "円 ／ " +
      "調理時間：約" + recipe.time + "分";

    const used = document.createElement("p");
    used.textContent =
      "材料：" + recipe.ingredients.join("、");

    const shoppingButton = document.createElement("button");
    shoppingButton.textContent = "🛒 材料を買い物リストに追加";

    shoppingButton.addEventListener("click", () => {
      const missingIngredients = recipe.ingredients.filter(item =>
        !ingredients.includes(item)
      );

      if (missingIngredients.length === 0) {
        alert("必要な材料は全部登録されているよ！");
        return;
      }

      missingIngredients.forEach(item => {
        if (!shoppingItems.includes(item)) {
          shoppingItems.push(item);
        }
      });

      localStorage.setItem(
        "shoppingItems",
        JSON.stringify(shoppingItems)
      );

      showList(shoppingItems, shoppingList, "shoppingItems");
      alert("買い物リストに追加したよ！");
    });
const stepsButton = document.createElement("button");
stepsButton.textContent = "作り方を見る";

stepsButton.addEventListener("click", () => {
    const detail = document.getElementById("recipeDetail");
    const content = document.getElementById("recipeDetailContent");
    const searchSection = recipeList.closest("section");

    content.innerHTML = "";

    const heading = document.createElement("h2");
    heading.textContent = recipe.name;
    content.appendChild(heading);

    const stepsTitle = document.createElement("h3");
    stepsTitle.textContent = "作り方";
    content.appendChild(stepsTitle);

    const list = document.createElement("ol");

   (recipe.steps || getRecipeSteps(recipe)).forEach(step => {        const item = document.createElement("li");
        item.textContent = step;
        list.appendChild(item);
    });

    content.appendChild(list);

    detail.hidden = false;
    searchSection.hidden = true;

    document.getElementById("backToRecipes").onclick = () => {
        detail.hidden = true;
        searchSection.hidden = false;
    };
});

card.appendChild(stepsButton);
    card.append(title, description, info, used, shoppingButton);

    // これが抜けていたよ！
    recipeList.appendChild(card);
  });
});

