let step = 0;

class actor{
    name = ""; // プレイヤー名 または　敵名
    job = ""; // 敵名　または　種族
    level = 1;

    normalStatus = {"最大LP": 100, "最大SP": 10,"LP": 100, "SP": 10, "攻撃力": 10, "防御力": 10, "敏捷性": 10, "魔力": 10, "抵抗": 10,
                    "命中率": 0.95,"回避率": 0.05}; // 通常時のステータス

    battleStatus = {"最大LP": 100, "最大SP": 10,"LP": 100, "SP": 10, "攻撃力": 10, "防御力": 10, "敏捷性": 10, "魔力": 10, "抵抗": 10,
                    "命中率": 0.95,"回避率": 0.05}; // バトル時のステータス、武器補正込み

    skill = []; // スキルリスト

    skillCount = 0;

    elementResist = {"物理": 1.0, "炎": 1.0, "水": 1.0, "雷": 1.0, "氷": 1.0, "風": 1.0, "土": 1.0, "聖": 1.0, "邪": 1.0};

    specialStateResist = {"毒": 1.0, "麻痺": 1.0, "暗闇": 1.0, "睡眠": 1.0, "混乱": 1.0}; 

    buffList = {"最大LP": 1.0, "最大SP": 1.0,"LP": 1.0, "SP": 1.0, "攻撃力": 1.0, "防御力": 1.0, "敏捷性": 1.0, "魔力": 1.0, "抵抗": 1.0,
    "命中率": 1.0,"回避率": 1.0}; // バフリスト。バトル時のステータスは常にこの補正がかかっている。

    buffturn = {"最大LP": 0.0, "最大SP": 0.0,"LP": 0.0, "SP": 0.0, "攻撃力": 0.0, "防御力": 0.0, "敏捷性": 0.0, "魔力": 0.0, "抵抗": 0.0,
    "命中率": 0.0,"回避率": 0.0}; // バフがかかっている際の残りターン

    weapon = {"ID": 0, "武器名": "なし", "耐久値": 0, "最大LP": 0, "最大SP": 0,"LP": 0, "SP": 0, "攻撃力": 0, "防御力": 0, "敏捷性": 0, "魔力": 0, "抵抗": 0,
    "命中率": 1.0,"回避率": 1.0, "属性": "物理"}; // 武器 または敵の攻撃の属性を定義

    armor = {"ID": 0, "防具名": "なし", "耐久値": 0, "最大LP": 0, "最大SP": 0,"LP": 0, "SP": 0, "攻撃力": 0, "防御力": 0, "敏捷性": 0, "魔力": 0, "抵抗": 0,
    "命中率": 1.0,"回避率": 1.0, "物理": 1.0, "炎": 1.0, "水": 1.0, "雷": 1.0, "氷": 1.0, "風": 1.0, "土": 1.0, "聖": 1.0, "邪": 1.0, "毒": 1.0, "麻痺": 1.0, "暗闇": 1.0, 
    "睡眠": 1.0}; // 防具　または敵の耐性を定義

    money = 1000; //所持金 または討伐した時の金額

    nowStateList = {"毒": 0, "麻痺": 0, "暗闇": 0, "睡眠": 0, "混乱": 0, "防御": 0, "疾風の構え": 0, "魔法反射": 0};

    constructor(name,job){

        this.name = name;
        this.job = job;

        if(job != ""){

            switch(job){

            case "剣士":
                this.normalStatus = {"最大LP": 100, "最大SP": 20,"LP": 100, "SP": 20, "攻撃力": 10, "防御力": 5, "敏捷性": 10, "魔力": 1, "抵抗": 3,
                "命中率": 0.95, "回避率": 0.05};

                this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));

                this.skill.push(0,1,15);

                break;

            case "神官":
                this.normalStatus = {"最大LP": 100, "最大SP": 80,"LP": 100, "SP": 80, "攻撃力": 6, "防御力": 6, "敏捷性": 4, "魔力": 10, "抵抗": 10,
                "命中率": 0.95, "回避率": 0.05};

                this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));

                this.skill.push(50,51);

                break;
            
            case "魔術士":
                this.normalStatus = {"最大LP": 80, "最大SP": 100,"LP": 80, "SP": 100, "攻撃力": 5, "防御力": 5, "敏捷性": 8, "魔力": 15, "抵抗": 8,
                "命中率": 0.95, "回避率": 0.05};
    
                this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));

                this.skill.push(52,53,54);
    
                break;

            case "騎士":
                this.normalStatus = {"最大LP": 150, "最大SP": 10,"LP": 150, "SP": 10, "攻撃力": 8, "防御力": 10, "敏捷性": 2, "魔力": 1, "抵抗": 6,
                "命中率": 0.95,"回避率": 0.05};
        
                this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));

                this.skill.push(2,3);
        
                break;

            case "アサシン":
                this.normalStatus = {"最大LP": 90, "最大SP": 30,"LP": 90, "SP": 30, "攻撃力": 8, "防御力": 5, "敏捷性": 10, "魔力": 5, "抵抗": 6,
                "命中率": 0.95,"回避率": 0.10};
            
                this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));
    
                this.skill.push(4,5,16,13);
            
                break;

            case "呪術士":
                this.normalStatus = {"最大LP": 90, "最大SP": 100,"LP": 90, "SP": 100, "攻撃力": 8, "防御力": 8, "敏捷性": 4, "魔力": 6, "抵抗": 10,
                "命中率": 0.95,"回避率": 0.05};
                
                this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));
        
                this.skill.push(65, 67, 70);
                
                break;

            case "精霊使い":
                this.normalStatus = {"最大LP": 80, "最大SP": 120,"LP": 80, "SP": 120, "攻撃力": 4, "防御力": 4, "敏捷性": 9, "魔力": 8, "抵抗": 15,
                "命中率": 0.95,"回避率": 0.05};
                    
                this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));
            
                this.skill.push(55, 56, 59);
                    
                break;

            case "ファイター":
                this.normalStatus = {"最大LP": 120, "最大SP": 30,"LP": 120, "SP": 30, "攻撃力": 10, "防御力": 8, "敏捷性": 8, "魔力": 1, "抵抗": 4,
                "命中率": 0.95,"回避率": 0.05};
                        
                this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));
                
                this.skill.push(17, 18);
                        
                break;

            case "クラウン":
                this.normalStatus = {"最大LP": Math.floor(Math.random() * 200), "最大SP": Math.floor(Math.random() * 100),"LP": 100,
                "SP": 100, "攻撃力": Math.floor(Math.random() * 20), "防御力": Math.floor(Math.random() * 20),
                "敏捷性": Math.floor(Math.random() * 20), "魔力": Math.floor(Math.random() * 20), "抵抗": Math.floor(Math.random() * 20),
                "命中率": 0.95,"回避率": 0.05};

                this.normalStatus["LP"] = this.normalStatus["最大LP"];
                this.normalStatus["SP"] = this.normalStatus["最大SP"];

                this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));

                for(step = 0; step <= 2; step++){

                    random = Math.floor(Math.random() * (skillDicitonary.length - 1));

                    this.skill.push(skillDicitonary[random]["skillID"]);

                }
                break;

            }
                
        }
        else{
            switch(name){

            case "ウルフ":
                this.normalStatus = {"最大LP": 80, "最大SP": 10,"LP": 80, "SP": 10, "攻撃力": 15, "防御力": 5, "敏捷性": 10, "魔力": 1, "抵抗": 3,
                "命中率": 0.95, "回避率": 0.05};

                this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));

                this.elementResist = {"物理": 1.0, "炎": 2.0, "水": 1.0, "雷": 1.0, "氷": 2.0, "風": 0.5, "土": 0.5, "聖": 1.0, "邪": 1.0};

                this.specialStateResist = {"毒": 1.0, "麻痺": 1.0, "暗闇": 0.5, "睡眠": 2.0, "混乱": 0.5};

                this.image = "wolf.png";

                this.skill.push(100);

                break;

            case "ポイズンバタフライ":
                this.normalStatus = {"最大LP": 100, "最大SP": 30,"LP": 100, "SP": 30, "攻撃力": 12, "防御力": 8, "敏捷性": 15, "魔力": 18, "抵抗": 15,
                "命中率": 0.95, "回避率": 0.05};

                this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));

                this.elementResist = {"物理": 1.0, "炎": 2.0, "水": 1.0, "雷": 2.0, "氷": 1.0, "風": 0.5, "土": 1.0, "聖": 1.0, "邪": 1.0};

                this.specialStateResist = {"毒": 0.5, "麻痺": 0.5, "暗闇": 1.0, "睡眠": 1.0, "混乱": 1.0};

                this.image = "poisonbutterfly.png";

                this.skill.push(55,101,102);

                break;

            case "ゴーレム":
                this.normalStatus = {"最大LP": 220, "最大SP": 5,"LP": 300, "SP": 5, "攻撃力": 25, "防御力": 35, "敏捷性": 1, "魔力": 0, "抵抗": 24,
                    "命中率": 0.95, "回避率": 0.05};
    
                    this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));
    
                this.elementResist = {"物理": 1.0, "炎": 0.5, "水": 0.5, "雷": 0.5, "氷": 1.0, "風": 2.0, "土": 0.5, "聖": 1.0, "邪": 1.0};
    
                this.specialStateResist = {"毒": 0.0, "麻痺": 0.0, "暗闇": 1.0, "睡眠": 0.0, "混乱": 0.0}; 
    
                this.skill.push(3,103);

                this.image = "gorem.png"
    
                break;

            case "ビー":
                this.normalStatus = {"最大LP": 50, "最大SP": 10,"LP": 50, "SP": 10, "攻撃力": 18, "防御力": 8, "敏捷性": 25, "魔力": 0, "抵抗": 5,
                        "命中率": 0.95, "回避率": 0.10};
        
                this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));
        
                this.elementResist = {"物理": 1.0, "炎": 2.0, "水": 1.0, "雷": 2.0, "氷": 2.0, "風": 0.5, "土": 0.5, "聖": 1.0, "邪": 1.0};
        
                this.specialStateResist = {"毒": 1.0, "麻痺": 1.0, "暗闇": 1.0, "睡眠": 1.0, "混乱": 1.0}; 

                this.image = "bee.png";
        
                this.skill.push(104);
        
                break;

            case "小悪魔":
                this.normalStatus = {"最大LP": 80, "最大SP": 40,"LP": 80, "SP": 40, "攻撃力": 8, "防御力": 5, "敏捷性": 12, "魔力": 15, "抵抗": 10,
                        "命中率": 0.95, "回避率": 0.05};
            
                this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));
            
                this.elementResist = {"物理": 1.0, "炎": 0.5, "水": 2.0, "雷": 1.0, "氷": 0.5, "風": 2.0, "土": 0.0, "聖": 2.0, "邪": 0.0};
            
                this.specialStateResist = {"毒": 1.0, "麻痺": 2.0, "暗闇": 0.5, "睡眠": 0.5, "混乱": 2.0}; 

                this.image = "babydevil.png";
            
                this.skill.push(52, 53, 65);
            
                break;

            case "リザード":
                this.normalStatus = {"最大LP": 100, "最大SP": 30,"LP": 100, "SP": 30, "攻撃力": 10, "防御力": 18, "敏捷性": 3, "魔力": 1, "抵抗": 10,
                            "命中率": 0.95, "回避率": 0.05};
                
                this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));
                
                this.elementResist = {"物理": 1.0, "炎": 0.5, "水": 0.5, "雷": 1.0, "氷": 2.0, "風": 2.0, "土": 0.5, "聖": 1.0, "邪": 1.0};
                
                this.specialStateResist = {"毒": 2.0, "麻痺": 0.5, "暗闇": 2.0, "睡眠": 2.0, "混乱": 0.5}; 

                this.image = "lizard.png"
                
                this.skill.push(106, 107);
                
                break;

            case "ゴブリン":
                this.normalStatus = {"最大LP": 80, "最大SP": 30,"LP": 80, "SP": 30, "攻撃力": 15, "防御力": 12, "敏捷性": 8, "魔力": 5, "抵抗": 15,
                            "命中率": 0.95, "回避率": 0.05};
            
                this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));
            
                this.elementResist = {"物理": 1.0, "炎": 2.0, "水": 1.0, "雷": 2.0, "氷": 2.0, "風": 0.5, "土": 0.5, "聖": 1.0, "邪": 1.0};
            
                this.specialStateResist = {"毒": 1.0, "麻痺": 1.0, "暗闇": 1.0, "睡眠": 1.0, "混乱": 1.0}; 

                this.image = "goblin.png"
            
                this.skill.push(51, 105);
            
                break;

            case "ゾンビ":
                this.normalStatus = {"最大LP": 200, "最大SP": 0,"LP": 150, "SP": 0, "攻撃力": 20, "防御力": 4, "敏捷性": 1, "魔力": 0, "抵抗": 2,
                            "命中率": 0.85, "回避率": 0.05};
                
                this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));
                
                this.elementResist = {"物理": 1.0, "炎": 2.0, "水": 0.5, "雷": 1.0, "氷": 0.5, "風": 2.0, "土": 0.0, "聖": 2.0, "邪": 0.5};
                
                this.specialStateResist = {"毒": 0.5, "麻痺": 0.5, "暗闇": 2.0, "睡眠": 0.0, "混乱": 0.0};

                this.image = "zombie.png";
                
                break;

            case "セイレーン":
                this.normalStatus = {"最大LP": 150, "最大SP": 50,"LP": 100, "SP": 50, "攻撃力": 16, "防御力": 10, "敏捷性": 10, "魔力": 20, "抵抗": 12,
                            "命中率": 0.95, "回避率": 0.05};
                
                this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));
                
                this.elementResist = {"物理": 1.0, "炎": 0.5, "水": 0.0, "雷": 2.0, "氷": 2.0, "風": 0.5, "土": 2.0, "聖": 0.5, "邪": 2.0};
                
                this.specialStateResist = {"毒": 1.0, "麻痺": 2.0, "暗闇": 0.5, "睡眠": 0.0, "混乱": 1.0};

                this.skill.push(66, 58);

                this.image = "seiren.png";

                break;

            case "ライトニング":
                this.normalStatus = {"最大LP": 120, "最大SP": 50,"LP": 120, "SP": 50, "攻撃力": 1, "防御力": 10, "敏捷性": 10, "魔力": 25, "抵抗": 10,
                            "命中率": 0.95, "回避率": 0.1};
                
                this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));
                
                this.elementResist = {"物理": 1.0, "炎": 1.0, "水": 1.0, "雷": 0.0, "氷": 1.0, "風": 1.0, "土": 2.0, "聖": 1.0, "邪": 1.0};
                
                this.specialStateResist = {"毒": 0.0, "麻痺": 0.0, "暗闇": 0.0, "睡眠": 0.0, "混乱": 0.0};

                this.skill.push(67, 73);

                this.image = "rightning.png"

                break;

            case "サラマンダー":
                this.normalStatus = {"最大LP": 150, "最大SP": 30,"LP": 150, "SP": 30, "攻撃力": 20, "防御力": 10, "敏捷性": 5, "魔力": 12, "抵抗": 12,
                                "命中率": 0.95, "回避率": 0.05};
                    
                this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));
                    
                this.elementResist = {"物理": 1.0, "炎": 0.5, "水": 0.5, "雷": 0.5, "氷": 0.5, "風": 2.0, "土": 2.0, "聖": 2.0, "邪": 1.0};
                    
                this.specialStateResist = {"毒": 2.0, "麻痺": 2.0, "暗闇": 2.0, "睡眠": 2.0, "混乱": 2.0};
    
                this.skill.push(107, 108, 109);

                this.image = "salamandar.png";
    
                break;

            case "ドラゴン":
                this.normalStatus = {"最大LP": 200, "最大SP": 50,"LP": 200, "SP": 50, "攻撃力": 20, "防御力": 16, "敏捷性": 6, "魔力": 14, "抵抗": 15,
                                 "命中率": 0.95, "回避率": 0.05};
                        
                this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));
                        
                this.elementResist = {"物理": 1.0, "炎": 0.5, "水": 0.5, "雷": 0.5, "氷": 0.5, "風": 2.0, "土": 2.0, "聖": 2.0, "邪": 1.0};
                        
                this.specialStateResist = {"毒": 2.0, "麻痺": 2.0, "暗闇": 2.0, "睡眠": 2.0, "混乱": 2.0};
        
                this.skill.push(59, 74, 108, 111, 112);

                this.image = "dragon.png";
        
                break;

            case "アークデーモン":
                this.normalStatus = {"最大LP": 160, "最大SP": 100,"LP": 160, "SP": 100, "攻撃力": 22, "防御力": 15, "敏捷性": 22, "魔力": 30, "抵抗": 28,
                        "命中率": 0.95, "回避率": 0.05};
                
                this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));
                
                this.elementResist = {"物理": 1.0, "炎": 0.5, "水": 2.0, "雷": 0.5, "氷": 0.5, "風": 2.0, "土": 0.0, "聖": 2.0, "邪": 0.0};
                
                this.specialStateResist = {"毒": 1.0, "麻痺": 2.0, "暗闇": 0.5, "睡眠": 0.5, "混乱": 2.0}; 
                
                this.skill.push(71, 72, 76, 65, 67, 68);

                this.image = "arcdemon.png";
                
                break;

            case "ヴァンパイア":
                this.normalStatus = {"最大LP": 140, "最大SP": 100,"LP": 140, "SP": 100, "攻撃力": 35, "防御力": 18, "敏捷性": 35, "魔力": 35, "抵抗": 19,
                        "命中率": 0.95, "回避率": 0.05};
                    
                this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));
                    
                this.elementResist = {"物理": 1.0, "炎": 2.0, "水": 2.0, "雷": 0.5, "氷": 0.5, "風": 0.5, "土": 2.0, "聖": 2.0, "邪": 0.5};
                    
                this.specialStateResist = {"毒": 1.0, "麻痺": 0.5, "暗闇": 0.0, "睡眠": 0.0, "混乱": 0.0}; 
                    
                this.skill.push(7, 14, 110, 113, 114);

                this.image = "vampire.png";
                    
                break;

            case "ティターニア":
                this.normalStatus = {"最大LP": 150, "最大SP": 200,"LP": 150, "SP": 200, "攻撃力": 22, "防御力": 16, "敏捷性": 50, "魔力": 28, "抵抗": 24,
                        "命中率": 0.95, "回避率": 0.10};
                    
                this.battleStatus = JSON.parse(JSON.stringify(this.normalStatus));
                    
                this.elementResist = {"物理": 1.0, "炎": 2.0, "水": 2.0, "雷": 0.5, "氷": 0.5, "風": 0.5, "土": 2.0, "聖": 2.0, "邪": 0.5};
                    
                this.specialStateResist = {"毒": 1.0, "麻痺": 0.5, "暗闇": 0.0, "睡眠": 0.0, "混乱": 0.0}; 
                    
                this.skill.push(74, 75, 77);

                this.image = "titania.png";
                    
                break;

                
            }

            

        }

        for(let i = 0;i <= skillDicitonary.length - 1; i++){

            for(let j = 0;j <= this.skill.length; j++){
    
                if(skillDicitonary[i]['skillID'] === this.skill[j]){
                    
                    this.skill[j] = skillDicitonary[i];

                    this.skillCount += 1;

                    break;
                }
            }

            if(this.skillCount >= this.skill.length) break;
        }


    }



}

const skillDicitonary = [
    /*スキル項目
    ID、名前、消費SP、属性、スキルタイプ(物理か魔法か）、ターゲット(自分か相手か)、
    倍率(ステータス倍率。ダメージや回復量がない場合は0)、発動回数、命中率補正、
    状態異常や特殊補正をかける際の特殊状態と倍率、バフデバフがある場合にかかるステータス、
    攻撃側が参照するステータス、防御側が参照するステータス、特殊フラグ(特殊効果がある場合、それを表す番号)*/

    {"skillID": 0,"skillName": "双竜","spendSP": 5,"element": "物理","skillType": "物理","target": "敵",
    "rate": 2.0,"number": 2,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "攻撃力","deffenceStatus": "防御力",
    "message": "素早い連撃を放った！","specialFlag": 0},

    {"skillID": 1,"skillName": "疾風の構え","spendSP": 5,"element": "物理","skillType": "物理","target": "自分",
    "rate": 0.0,"number": 1,"hit": 1.0,"state":["疾風の構え",1.0],"buff": "","attackStatus": "","deffenceStatus": "",
    "message": "疾風の構えをとった！","specialFlag": 0},

    {"skillID": 2,"skillName": "シールドバッシュ","spendSP": 5,"element": "物理","skillType": "物理","target": "敵",
    "rate": 2.0,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "防御力","deffenceStatus": "防御力",
    "message": "盾を構えて突進した！","specialFlag": 1},

    {"skillID": 3,"skillName": "鉄壁の構え","spendSP": 1,"element": "物理","skillType": "物理","target": "自分",
    "rate": 0.0,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "防御力","attackStatus": "","deffenceStatus": "",
    "message": "鉄壁の構えをとった！","specialFlag": 0},

    {"skillID": 4,"skillName": "ベノムファング","spendSP": 5,"element": "物理","skillType": "物理","target": "敵",
    "rate": 2.0,"number": 1,"hit": 1.0,"state":["毒",0.5],"buff": "","attackStatus": "攻撃力","deffenceStatus": "防御力",
    "message": "毒を塗った武器で斬りつけた！","specialFlag": 0},

    {"skillID": 5,"skillName": "ナイトバタフライ","spendSP": 5,"element": "物理","skillType": "物理","target": "敵",
    "rate": 2.0,"number": 1,"hit": 1.0,"state":["睡眠",0.5],"buff": "","attackStatus": "攻撃力","deffenceStatus": "防御力",
    "message": "睡眠ガスを纏った武器で斬りつけた！","specialFlag": 0},

    {"skillID": 6,"skillName": "火炎剣","spendSP": 5,"element": "炎","skillType": "物理","target": "敵",
    "rate": 2.0,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "攻撃力","deffenceStatus": "防御力",
    "message": "火炎を纏った剣で斬りつけた！","specialFlag": 0},

    {"skillID": 7,"skillName": "氷結剣","spendSP": 5,"element": "氷","skillType": "物理","target": "敵",
    "rate": 2.0,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "攻撃力","deffenceStatus": "防御力",
    "message": "氷を纏った剣で斬りつけた！","specialFlag": 0},

    {"skillID": 8,"skillName": "雷鳴剣","spendSP": 5,"element": "雷","skillType": "物理","target": "敵",
    "rate": 2.0,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "攻撃力","deffenceStatus": " 防御力",
    "message": "雷を纏った剣で斬りつけた！","specialFlag": 0},

    {"skillID": 9,"skillName": "烈風剣","spendSP": 5,"element": "風","skillType": "物理","target": "敵",
    "rate": 2.0,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "攻撃力","deffenceStatus": "防御力",
    "message": "風を纏った剣で斬りつけた！","specialFlag": 0},

    {"skillID": 10,"skillName": "土砕剣","spendSP": 5,"element": "土","skillType": "物理","target": "敵",
    "rate": 2.0,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "攻撃力","deffenceStatus": "防御力",
    "message": "土を纏った剣で斬りつけた！","specialFlag": 0},

    {"skillID": 11,"skillName": "神聖剣","spendSP": 5,"element": "聖","skillType": "物理","target": "敵",
    "rate": 2.0,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "攻撃力","deffenceStatus": "防御力",
    "message": "神聖な力を纏った剣で斬りつけた！","specialFlag": 0},

    {"skillID": 12,"skillName": "邪眼剣","spendSP": 5,"element": "邪","skillType": "物理","target": "敵",
    "rate": 2.0,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "攻撃力","deffenceStatus": "防御力",
    "message": "邪悪な力を纏った剣で斬りつけた！","specialFlag": 0},

    {"skillID": 13,"skillName": "絶対回避","spendSP": 10,"element": "","skillType": "物理","target": "自分",
    "rate": 0.0,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "回避率","attackStatus": "","deffenceStatus": "",
    "message": "物理攻撃を回避する構えをとった！","specialFlag": 0},

    {"skillID": 14,"skillName": "乱れ突き","spendSP": 6,"element": "物理","skillType": "物理","target": "敵",
    "rate": 1.0,"number": 6,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "攻撃力","deffenceStatus": "防御力",
    "message": "素早い突きを何度も放った！","specialFlag": 0},

    {"skillID": 15,"skillName": "剛剣","spendSP": 5,"element": "物理","skillType": "物理","target": "敵",
    "rate": 3.0,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "攻撃力","deffenceStatus": "防御力",
    "message": "力強く剣をふるった！","specialFlag": 0},

    {"skillID": 16,"skillName": "一撃の刃","spendSP": 20,"element": "物理","skillType": "物理","target": "敵",
    "rate": 100.0,"number": 1,"hit": 0.3,"state":["",0.0],"buff": "","attackStatus": "攻撃力","deffenceStatus": "防御力",
    "message": "相手の急所を狙って攻撃！","specialFlag": 0},

    {"skillID": 17,"skillName": "ビルドアップ","spendSP": 10,"element": "物理","skillType": "物理","target": "自分",
    "rate": 0,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "攻撃力","attackStatus": "","deffenceStatus": "",
    "message": "筋肉が膨張する！","specialFlag": 5},

    {"skillID": 18,"skillName": "雄たけび","spendSP": 5,"element": "物理","skillType": "物理","target": "敵",
    "rate": 0,"number": 1,"hit": 1,"state":["",0.0],"buff": "攻撃力","attackStatus": "","deffenceStatus": "",
    "message": "獣の如き雄たけびをあげた！","specialFlag": 6},

    // 魔法 50～100
    {"skillID": 50,"skillName": "ホーリーライト","spendSP": 10,"element": "聖","skillType": "魔法","target": "敵",
    "rate": 2.5,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "魔力","deffenceStatus": "抵抗",
    "message": "聖なる光が魔を浄化する！","specialFlag": 0},

    {"skillID": 51,"skillName": "ヒーリング","spendSP": 10,"element": "","skillType": "魔法","target": "自分",
    "rate": 0.5,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "","deffenceStatus": "",
    "message": "温かな光が傷を癒す！","specialFlag": 0},

    {"skillID": 52,"skillName": "ファイアボール","spendSP": 10,"element": "炎","skillType": "魔法","target": "敵",
    "rate": 2.5,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "魔力","deffenceStatus": "抵抗",
    "message": "火の玉が放たれる！","specialFlag": 0},

    {"skillID": 53,"skillName": "アイシクルショット","spendSP": 10,"element": "氷","skillType": "魔法","target": "敵",
    "rate": 2.5,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "魔力","deffenceStatus": "抵抗",
    "message": "氷柱が狙い撃つ！","specialFlag": 0},

    {"skillID": 54,"skillName": "サンダーボルト","spendSP": 10,"element": "雷","skillType": "魔法","target": "敵",
    "rate": 2.5,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "魔力","deffenceStatus": "抵抗",
    "message": "電撃が迸る！","specialFlag": 0},

    {"skillID": 55,"skillName": "ウィンドカッター","spendSP": 10,"element": "風","skillType": "魔法","target": "敵",
    "rate": 2.5,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "魔力","deffenceStatus": "抵抗",
    "message": "風の刃が切り裂く！","specialFlag": 0},

    {"skillID": 56,"skillName": "ストーンスロウ","spendSP": 10,"element": "土","skillType": "魔法","target": "敵",
    "rate": 2.5,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "魔力","deffenceStatus": "抵抗",
    "message": "石礫が跳ぶ！","specialFlag": 0},

    {"skillID": 57,"skillName": "ウィキッドエナジー","spendSP": 10,"element": "邪","skillType": "魔法","target": "敵",
    "rate": 2.5,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "魔力","deffenceStatus": "抵抗",
    "message": "邪悪な力が蝕む！","specialFlag": 0},

    {"skillID": 58,"skillName": "バブルボム","spendSP": 10,"element": "水","skillType": "魔法","target": "敵",
    "rate": 2.5,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "魔力","deffenceStatus": "抵抗",
    "message": "水泡が炸裂する！","specialFlag": 0},

    {"skillID": 59,"skillName": "ミラー","spendSP": 20,"element": "","skillType": "魔法","target": "自分",
    "rate": 0.0,"number": 1,"hit": 1.0,"state":["魔法反射",1.0],"buff": "","attackStatus": "","deffenceStatus": "",
    "message": "魔法を反射する壁が生成された！","specialFlag": 0},
    // 状態異常魔法65～
    {"skillID": 65,"skillName": "コンフューズ","spendSP": 12,"element": "","skillType": "魔法","target": "敵",
    "rate": 0.0,"number": 1,"hit": 1.0,"state":["混乱",0.5],"buff": "","attackStatus": "","deffenceStatus": "",
    "message": "混乱の波動が放たれた！","specialFlag": 0},

    {"skillID": 66,"skillName": "スリープ","spendSP": 12,"element": "","skillType": "魔法","target": "敵",
    "rate": 0.0,"number": 1,"hit": 1.0,"state":["睡眠",0.5],"buff": "","attackStatus": "","deffenceStatus": "",
    "message": "睡眠の霧が放たれた！","specialFlag": 0},

    {"skillID": 67,"skillName": "ダーククラウド","spendSP": 12,"element": "","skillType": "魔法","target": "敵",
    "rate": 0.0,"number": 1,"hit": 1.0,"state":["暗闇",0.5],"buff": "","attackStatus": "","deffenceStatus": "",
    "message": "暗闇の雲が視界を覆う！","specialFlag": 0},

    {"skillID": 68,"skillName": "パライズ","spendSP": 12,"element": "","skillType": "魔法","target": "敵",
    "rate": 0.0,"number": 1,"hit": 1.0,"state":["麻痺",0.5],"buff": "","attackStatus": "","deffenceStatus": "",
    "message": "痺れる網で拘束される！","specialFlag": 0},

    {"skillID": 70,"skillName": "不思議な煙","spendSP": 5,"element": "","skillType": "魔法","target": "敵",
    "rate": 0,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "","deffenceStatus": "",
    "message": "不思議な煙が体を侵す！","specialFlag": 4},

    // 上位魔法71～
    {"skillID": 71,"skillName": "フレイムピラー","spendSP": 20,"element": "炎","skillType": "魔法","target": "敵",
    "rate": 3.25,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "魔力","deffenceStatus": "抵抗",
    "message": "火柱が立ち昇る！","specialFlag": 0},

    {"skillID": 72,"skillName": "ブリザード","spendSP": 20,"element": "氷","skillType": "魔法","target": "敵",
    "rate": 3.25,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "魔力","deffenceStatus": "抵抗",
    "message": "猛吹雪が吹き荒れる！","specialFlag": 0},

    {"skillID": 73,"skillName": "ライトニング","spendSP": 20,"element": "雷","skillType": "魔法","target": "敵",
    "rate": 3.25,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "魔力","deffenceStatus": "抵抗",
    "message": "雷が鳴り響く！","specialFlag": 0},

    {"skillID": 74,"skillName": "トルネード","spendSP": 20,"element": "風","skillType": "魔法","target": "敵",
    "rate": 3.25,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "魔力","deffenceStatus": "抵抗",
    "message": "竜巻が吹き飛ばす！","specialFlag": 0},

    {"skillID": 75,"skillName": "ロックフォール","spendSP": 20,"element": "土","skillType": "魔法","target": "敵",
    "rate": 3.25,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "魔力","deffenceStatus": "抵抗",
    "message": "巨大な岩が落ちる！","specialFlag": 0},

    {"skillID": 76,"skillName": "マリシャスウェイブ","spendSP": 20,"element": "邪","skillType": "魔法","target": "敵",
    "rate": 3.25,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "魔力","deffenceStatus": "抵抗",
    "message": "邪悪な力が波となり押し寄せる！","specialFlag": 0},

    {"skillID": 77,"skillName": "パニッシュ","spendSP": 20,"element": "聖","skillType": "魔法","target": "敵",
    "rate": 3.25,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "魔力","deffenceStatus": "抵抗",
    "message": "魔を滅する神罰の聖光！","specialFlag": 0},

    // 敵の技 101～
    {"skillID": 100,"skillName": "とびかかり","spendSP": 1,"element": "物理","skillType": "物理","target": "敵",
    "rate": 2.5,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "攻撃力","deffenceStatus": "防御力",
    "message": "一心不乱にとびかかる！","specialFlag": 0},

    {"skillID": 101,"skillName": "毒の鱗粉","spendSP": 5,"element": "物理","skillType": "物理","target": "敵",
    "rate": 0,"number": 1,"hit": 1.0,"state":["毒",0.5],"buff": "","attackStatus": "","deffenceStatus": "",
    "message": "毒の鱗粉がばら撒かれる！","specialFlag": 0},

    {"skillID": 102,"skillName": "しびれる花粉","spendSP": 5,"element": "物理","skillType": "物理","target": "敵",
    "rate": 0,"number": 1,"hit": 1.0,"state":["麻痺",0.5],"buff": "","attackStatus": "","deffenceStatus": "",
    "message": "しびれる花粉がばら撒かれる！","specialFlag": 0},

    {"skillID": 103,"skillName": "破壊の一撃","spendSP": 1,"element": "物理","skillType": "物理","target": "敵",
    "rate": 4.0,"number": 1,"hit": 0.5,"state":["",0.0],"buff": "","attackStatus": "攻撃力","deffenceStatus": "防御力",
    "message": "破壊の衝動に満ちた一撃！","specialFlag": 0},

    {"skillID": 104,"skillName": "毒針","spendSP": 1,"element": "物理","skillType": "物理","target": "敵",
    "rate": 2.0,"number": 1,"hit": 1.0,"state":["毒",0.5],"buff": "","attackStatus": "攻撃力","deffenceStatus": "防御力",
    "message": "毒針で刺してきた！","specialFlag": 0},

    {"skillID": 105,"skillName": "袋叩き","spendSP": 10,"element": "物理","skillType": "物理","target": "敵",
    "rate": Math.random() + 0.5,"number": Math.floor(Math.random() * 5) + 1 ,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "攻撃力","deffenceStatus": "防御力",
    "message": "仲間を呼んで袋叩き！","specialFlag": 0},

    {"skillID": 106,"skillName": "アクアブレス","spendSP": 10,"element": "水","skillType": "物理","target": "敵",
    "rate": 0.3,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "LP","deffenceStatus": "防御力",
    "message": "水が勢いよく放射される！","specialFlag": 0},

    {"skillID": 107,"skillName": "かみ砕く","spendSP": 2,"element": "物理","skillType": "物理","target": "敵",
    "rate": 2.5,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "防御力","attackStatus": "攻撃力","deffenceStatus": "防御力",
    "message": "無数の牙が嚙み砕く！","specialFlag": 0},

    {"skillID": 108,"skillName": "ファイアブレス","spendSP": 10,"element": "炎","skillType": "物理","target": "敵",
    "rate": 0.3,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "LP","deffenceStatus": "防御力",
    "message": "灼熱の炎が焼き尽くす！","specialFlag": 0},

    {"skillID": 109,"skillName": "暴れる","spendSP": 10,"element": "物理","skillType": "物理","target": "敵",
    "rate": 1.5,"number": Math.floor(Math.random() * 4) + 1 ,"hit": 0.9,"state":["",0.0],"buff": "","attackStatus": "攻撃力","deffenceStatus": "防御力",
    "message": "衝動のままに暴れまくる！","specialFlag": 0},

    {"skillID": 110,"skillName": "吸血","spendSP": 5,"element": "物理","skillType": "物理","target": "敵",
    "rate": 2.0,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "攻撃力","deffenceStatus": "防御力",
    "message": "突き立てられた牙が血を吸い取る！","specialFlag": 2},

    {"skillID": 111,"skillName": "ドラゴンテイル","spendSP": 10,"element": "物理","skillType": "物理","target": "敵",
    "rate": 2.5,"number": 1,"hit": 1.0,"state":["麻痺",0.3],"buff": "","attackStatus": "攻撃力","deffenceStatus": "防御力",
    "message": "巨大な尾が薙ぎ払う！","specialFlag": 0},

    {"skillID": 112,"skillName": "龍の咆哮","spendSP": 5,"element": "物理","skillType": "物理","target": "自分",
    "rate": 0,"number": 1,"hit": 1.0,"state":["",0.0],"buff": "攻撃力","attackStatus": "","deffenceStatus": "",
    "message": "咆哮が響き渡る！","specialFlag": 3},

    {"skillID": 113,"skillName": "眷属魔弾","spendSP": 15,"element": "邪","skillType": "魔法","target": "敵",
    "rate": Math.random() + 1.5,"number": Math.floor(Math.random() * 7) + 3 ,"hit": 1.0,"state":["",0.0],"buff": "","attackStatus": "魔力","deffenceStatus": "抵抗",
    "message": "眷属たちが敵に特攻していく！","specialFlag": 0},

    {"skillID": 114,"skillName": "夜宴","spendSP": 25,"element": "邪","skillType": "魔法","target": "敵",
    "rate": 3.0,"number": 1,"hit": 1.0,"state":["睡眠",0.8],"buff": "","attackStatus": "魔力","deffenceStatus": "防御力",
    "message": "夜の支配者たちの宴が開かれる！","specialFlag": 0}

    
]

const weaponDictionary = [
    {"ID": 0, "武器名": "なし", "耐久値": 0, "最大LP": 0, "最大SP": 0,"LP": 0, "SP": 0, "攻撃力": 0, "防御力": 0, "敏捷性": 0, "魔力": 0, "抵抗": 0,
    "命中率": 1.0, "回避率": 1.0, "属性": "物理"},

    {"ID": 1, "武器名": "鉄の剣", "耐久値": 100, "最大LP": 0, "最大SP": 0,"LP": 0, "SP": 0, "攻撃力": 5, "防御力": 0, "敏捷性": 0, "魔力": 0, "抵抗": 0,
    "命中率": 1.0, "回避率": 1.0, "属性": "物理"},

    {"ID": 2, "武器名": "木の杖", "耐久値": 100, "最大LP": 0, "最大SP": 0,"LP": 0, "SP": 0, "攻撃力": 1, "防御力": 0, "敏捷性": 0, "魔力": 2, "抵抗": 3,
    "命中率": 1.0, "回避率": 1.0, "属性": "物理"},

    {"ID": 3, "武器名": "木のロッド", "耐久値": 100, "最大LP": 0, "最大SP": 0,"LP": 0, "SP": 0, "攻撃力": 1, "防御力": 0, "敏捷性": 0, "魔力": 5, "抵抗": 1,
    "命中率": 1.0, "回避率": 1.0, "属性": "物理"},

    {"ID": 4, "武器名": "鉄の槍", "耐久値": 100, "最大LP": 0, "最大SP": 0,"LP": 0, "SP": 0, "攻撃力": 3, "防御力": 1, "敏捷性": 0, "魔力": 0, "抵抗": 0,
    "命中率": 1.0, "回避率": 1.0, "属性": "物理"},

    {"ID": 5, "武器名": "ダガー", "耐久値": 100, "最大LP": 0, "最大SP": 0,"LP": 0, "SP": 0, "攻撃力": 3, "防御力": 0, "敏捷性": 5, "魔力": 0, "抵抗": 0,
    "命中率": 1.0, "回避率": 1.0, "属性": "物理"}

]

const armorDictionary = [
    {"ID": 0, "防具名": "なし", "耐久値": 0, "最大LP": 0, "最大SP": 0,"LP": 0, "SP": 0, "攻撃力": 0, "防御力": 0, "敏捷性": 0, "魔力": 0, "抵抗": 0,
    "命中率": 1.0, "回避率": 1.0, "物理": 1.0, "炎": 1.0, "水": 1.0, "雷": 1.0, "氷": 1.0, "風": 1.0, "土": 1.0, "聖": 1.0, "邪": 1.0, "毒": 1.0, "麻痺": 1.0, "暗闇": 1.0, 
    "睡眠": 1.0},

    {"ID": 1, "防具名": "鉄の鎧", "耐久値": 100, "最大LP": 0, "最大SP": 0,"LP": 0, "SP": 0, "攻撃力": 0, "防御力": 5, "敏捷性": 0, "魔力": 0, "抵抗": 0,
    "命中率": 1.0, "回避率": 1.0, "物理": 1.0, "炎": 1.0, "水": 1.0, "雷": 1.0, "氷": 1.0, "風": 1.0, "土": 1.0, "聖": 1.0, "邪": 1.0, "毒": 1.0, "麻痺": 1.0, "暗闇": 1.0, 
    "睡眠": 1.0},

    {"ID": 2, "防具名": "布のローブ", "耐久値": 100, "最大LP": 0, "最大SP": 0,"LP": 0, "SP": 0, "攻撃力": 0, "防御力": 2, "敏捷性": 0, "魔力": 2, "抵抗": 5,
    "命中率": 1.0, "回避率": 1.0, "物理": 1.0, "炎": 1.0, "水": 1.0, "雷": 1.0, "氷": 1.0, "風": 1.0, "土": 1.0, "聖": 1.0, "邪": 1.0, "毒": 1.0, "麻痺": 1.0, "暗闇": 1.0, 
    "睡眠": 1.0},

    {"ID": 3, "防具名": "布の服", "耐久値": 100, "最大LP": 0, "最大SP": 0,"LP": 0, "SP": 0, "攻撃力": 0, "防御力": 3, "敏捷性": 0, "魔力": 0, "抵抗": 0,
    "命中率": 1.0, "回避率": 1.0, "物理": 1.0, "炎": 1.0, "水": 1.0, "雷": 1.0, "氷": 1.0, "風": 1.0, "土": 1.0, "聖": 1.0, "邪": 1.0, "毒": 1.0, "麻痺": 1.0, "暗闇": 1.0, 
    "睡眠": 1.0},

    {"ID": 4, "防具名": "黒き衣", "耐久値": 100, "最大LP": 0, "最大SP": 0,"LP": 0, "SP": 0, "攻撃力": 0, "防御力": 2, "敏捷性": 5, "魔力": 0, "抵抗": 0,
    "命中率": 1.0, "回避率": 1.0, "物理": 1.0, "炎": 1.0, "水": 1.0, "雷": 1.0, "氷": 1.0, "風": 1.0, "土": 1.0, "聖": 1.0, "邪": 1.0, "毒": 1.0, "麻痺": 1.0, "暗闇": 1.0, 
    "睡眠": 1.0}

    
]

const itemDictionary = [
    {"itemID":0,"name":"回復薬","element":"物理","itemtype1": "物理","itemtype2": "回復","power": 50,
     "number": 1,"hit": 1.0,"state":['',0.0],"message": "回復薬を飲んだ！", "special_flag": 0},

    {"itemID":1,"name":"解毒薬","element":"物理","itemtype1": "物理","itemtype2": "回復","power": 0,
    "number": 1,"hit": 1.0,"state":['毒',0.0],"message": "解毒薬を飲んだ！", "special_flag": 0},

    {"itemID":2,"name":"石つぶて","element":"物理","itemtype1": "物理","itemtype2": "攻撃","power": 50,
    "number": 1,"hit": 1.0,"state":['',0.0],"message": "石礫を投げた！", "special_flag": 0},

    {"itemID":3,"name":"爆弾","element":"物理","itemtype1": "物理","itemtype2": "攻撃","power": 100,
    "number": 1,"hit": 1.0,"state":['',0.0],"message": "爆弾を投げた！", "special_flag": 0}
    
]


let player;

let enemy;

const mainMessage = document.getElementById("main");

const Picturetop = document.getElementById("gamePictureTop");

let gameImage = document.createElement("img");

//const gameAudio = document.getElementById("gameAudio");

const PictureBottom = document.getElementById("command");

const messageBox = document.getElementsByClassName("battleLog"); // バトルのログを表示するためのメッセージ

let currentLog = 0; //　バトルのログの行数を示す変数

const jobButton = document.getElementsByClassName("job");

const statusPrint = document.createElement("h3");

const sword = jobButton[0];

sword.onclick = function(){

    player = new actor("剣士", "剣士");

    player.weapon = weaponDictionary[1];

    player.armor = armorDictionary[3];


    start();

}

const priest = jobButton[1];

priest.onclick = function(){

    player = new actor("神官", "神官");

    player.weapon = weaponDictionary[2];

    player.armor = armorDictionary[2];

    start();

}

const which = jobButton[2];

which.onclick = function(){

    player = new actor("魔術士", "魔術士");

    player.weapon = weaponDictionary[3];

    player.armor = armorDictionary[2];

    start();

}

const knight = jobButton[3];

knight.onclick = function(){

    player = new actor("騎士", "騎士");

    player.weapon = weaponDictionary[4];

    player.armor = armorDictionary[1];

    start();

}

const assasin = jobButton[4];

assasin.onclick = function(){

    player = new actor("アサシン", "アサシン");
    
    player.weapon = weaponDictionary[5];

    player.armor = armorDictionary[4];


    start();



}

const curse = jobButton[5];

curse.onclick = function(){

    player = new actor("呪術士", "呪術士");

    player.weapon = weaponDictionary[3];

    player.armor = armorDictionary[2];

    start();



}

const fairy = jobButton[6];

fairy.onclick = function(){

    player = new actor("精霊使い", "精霊使い");

    player.weapon = weaponDictionary[3];

    player.armor = armorDictionary[2];

    start();



}

const fighter = jobButton[7];

fighter.onclick = function(){

    player = new actor("ファイター", "ファイター");

    player.armor = armorDictionary[3];

    start();



}

const clown = jobButton[jobButton.length - 1];

clown.onclick = function(){

    player = new actor("クラウン", "クラウン");


    start();



}

const consecutiveList = ["ウルフ", "ビー", "リザード", "小悪魔", "ゴブリン",
                         "ポイズンバタフライ", "ゾンビ", "セイレーン", "ライトニング", "サラマンダー",
                         "ゴーレム", "ドラゴン", "アークデーモン", "ヴァンパイア", "ティターニア",
                         "混沌の神",
                         "謎の道化師", "メタモルジェリー"] //連戦用の敵名を入れたリスト 0～4が3戦目まで、5～9が6戦目まで、10～14が9戦目まで、15がラスボス、　1617は特殊枠

let battleNumber = 0;
let random = 0;
let skillCommand = 0;
let pattern = 0;
let enemyCommand = 0;
let playerSpeed = 0;
let enemySpeed = 0;
let damage = 0;
let actionNumber = 0;

// コマンド用のボタン
const attackButton = document.createElement("button");
    attackButton.textContent = "攻撃";
    attackButton.id = "攻撃";

    attackButton.onclick = function(){ // 攻撃ボタン

        for(i = 0; i < 10; i++){

            messageBox[i].textContent = "";


        }
        currentLog = 0;

        enemyCommand = Math.floor(Math.random() * pattern + 1); // 敵の行動決定

        playerSpeed = player.battleStatus["敏捷性"];

        if(enemyCommand === 2){ // 敵が防御を選んでいた場合に素早さ補正をかける
            enemySpeed = enemy.battleStatus["敏捷性"] * 999;
        }
        else{
            enemySpeed = enemy.battleStatus["敏捷性"];
        }

        if(playerSpeed >= enemySpeed){ // 行動順の決定
            damageCalc(1, player, enemy);
            damageCalc(enemyCommand, enemy, player);
            
        }
        else{
            damageCalc(enemyCommand, enemy, player);
            damageCalc(1, player, enemy);
        }

        if(player.nowStateList["疾風の構え"] > 0) damageCalc(1, player, enemy);
        if(enemy.nowStateList["疾風の構え"] > 0 && enemy.skill[enemyCommand - 3]["skillName"] !== "疾風の構え") damageCalc(enemyCommand, enemy, player);
    }

    const guardButton = document.createElement("button");
    guardButton.textContent = "防御";
    guardButton.id = "防御";
    

    guardButton.onclick = function(){ // 攻撃ボタン

        for(i = 0; i < 10; i++){

            messageBox[i].textContent = "";


        }

        currentLog = 0;


        enemyCommand = Math.floor(Math.random() * pattern + 1); // 敵の行動決定

        playerSpeed = player.battleStatus["敏捷性"] * 999;

        if(enemyCommand === 2){ // 敵が防御を選んでいた場合に素早さ補正をかける
            enemySpeed = enemy.battleStatus["敏捷性"] * 999;
        }
        else{
            enemySpeed = enemy.battleStatus["敏捷性"];
        }

        if(playerSpeed >= enemySpeed){ // 行動順の決定
            if(player.battleStatus["LP"] > 0 && enemy.battleStatus["LP"] > 0) damageCalc(2, player, enemy);
            if(player.battleStatus["LP"] > 0 && enemy.battleStatus["LP"] > 0)damageCalc(enemyCommand, enemy, player);
            
        }
        else{
            if(player.battleStatus["LP"] > 0 && enemy.battleStatus["LP"] > 0)damageCalc(enemyCommand, enemy, player);
            if(player.battleStatus["LP"] > 0 && enemy.battleStatus["LP"] > 0)damageCalc(2, player, enemy);
        }

        if(enemy.nowStateList["疾風の構え"] > 0 && enemy.skill[enemyCommand - 3]["skillName"] !== "疾風の構え") damageCalc(enemyCommand, enemy, player);

    }

    const skillButton1 = document.createElement("button");
    

    skillButton1.onclick = function(){ // スキルボタン1

        for(i = 0; i < 10; i++){

            messageBox[i].textContent = "";


        }

        currentLog = 0;


        enemyCommand = Math.floor(Math.random() * pattern + 1); // 敵の行動決定

        playerSpeed = player.battleStatus["敏捷性"];

        if(enemyCommand === 2){ // 敵が防御を選んでいた場合に素早さ補正をかける
            enemySpeed = enemy.battleStatus["敏捷性"] * 999;
        }
        else{
            enemySpeed = enemy.battleStatus["敏捷性"];
        }

        if(playerSpeed >= enemySpeed){ // 行動順の決定
            if(player.battleStatus["LP"] > 0 && enemy.battleStatus["LP"] > 0)damageCalc(3, player, enemy);
            if(player.battleStatus["LP"] > 0 && enemy.battleStatus["LP"] > 0)damageCalc(enemyCommand, enemy, player);
            
        }
        else{
            if(player.battleStatus["LP"] > 0 && enemy.battleStatus["LP"] > 0)damageCalc(enemyCommand, enemy, player);
            if(player.battleStatus["LP"] > 0 && enemy.battleStatus["LP"] > 0)damageCalc(3, player, enemy);
        }

        if(player.nowStateList["疾風の構え"] > 0 && player.skill[0]["skillName"] !== "疾風の構え") damageCalc(3, player, enemy);
        if(enemy.nowStateList["疾風の構え"] > 0 && enemy.skill[enemyCommand - 3]["skillName"] !== "疾風の構え") damageCalc(enemyCommand, enemy, player);

    }

    const skillButton2 = document.createElement("button");
    
    skillButton2.onclick = function(){ // スキルボタン2

        for(i = 0; i < 10; i++){

            messageBox[i].textContent = "";


        }

        currentLog = 0;


        enemyCommand = Math.floor(Math.random() * pattern + 1); // 敵の行動決定

        playerSpeed = player.battleStatus["敏捷性"];

        if(enemyCommand === 2){ // 敵が防御を選んでいた場合に素早さ補正をかける
            enemySpeed = enemy.battleStatus["敏捷性"] * 999;
        }
        else{
            enemySpeed = enemy.battleStatus["敏捷性"];
        }

        if(playerSpeed >= enemySpeed){ // 行動順の決定
            if(player.battleStatus["LP"] > 0 && enemy.battleStatus["LP"] > 0)damageCalc(4, player, enemy);
            if(player.battleStatus["LP"] > 0 && enemy.battleStatus["LP"] > 0)damageCalc(enemyCommand, enemy, player);
            
        }
        else{
            if(player.battleStatus["LP"] > 0 && enemy.battleStatus["LP"] > 0)damageCalc(enemyCommand, enemy, player);
            if(player.battleStatus["LP"] > 0 && enemy.battleStatus["LP"] > 0)damageCalc(4, player, enemy);
        }

        if(player.nowStateList["疾風の構え"] > 0 && player.skill[1]["skillName"] !== "疾風の構え") damageCalc(4, player, enemy);
        if(enemy.nowStateList["疾風の構え"] > 0 && enemy.skill[enemyCommand - 3]["skillName"] !== "疾風の構え") damageCalc(enemyCommand, enemy, player);
    }

    const skillButton3 = document.createElement("button");
    skillButton3.onclick = function(){ // スキルボタン3

        for(i = 0; i < 10; i++){

            messageBox[i].textContent = "";


        }

        currentLog = 0;


        enemyCommand = Math.floor(Math.random() * pattern + 1); // 敵の行動決定

        playerSpeed = player.battleStatus["敏捷性"];

        if(enemyCommand === 2){ // 敵が防御を選んでいた場合に素早さ補正をかける
            enemySpeed = enemy.battleStatus["敏捷性"] * 999;
        }
        else{
            enemySpeed = enemy.battleStatus["敏捷性"];
        }

        if(playerSpeed >= enemySpeed){ // 行動順の決定
            if(player.battleStatus["LP"] > 0 && enemy.battleStatus["LP"] > 0)damageCalc(5, player, enemy);
            if(player.battleStatus["LP"] > 0 && enemy.battleStatus["LP"] > 0)damageCalc(enemyCommand, enemy, player);
            
        }
        else{
            if(player.battleStatus["LP"] > 0 && enemy.battleStatus["LP"] > 0)damageCalc(enemyCommand, enemy, player);
            if(player.battleStatus["LP"] > 0 && enemy.battleStatus["LP"] > 0)damageCalc(5, player, enemy);
        }

        if(player.nowStateList["疾風の構え"] > 0 && player.skill[2]["skillName"] !== "疾風の構え") damageCalc(5, player, enemy);
        if(enemy.nowStateList["疾風の構え"] > 0 && enemy.skill[enemyCommand - 3]["skillName"] !== "疾風の構え") damageCalc(enemyCommand, enemy, player);
    }

    const skillButton4 = document.createElement("button");
    skillButton4.onclick = function(){ // スキルボタン3

        enemyCommand = Math.floor(Math.random() * pattern + 1); // 敵の行動決定

        playerSpeed = player.battleStatus["敏捷性"];

        if(enemyCommand === 2){ // 敵が防御を選んでいた場合に素早さ補正をかける
            enemySpeed = enemy.battleStatus["敏捷性"] * 999;
        }
        else{
            enemySpeed = enemy.battleStatus["敏捷性"];
        }

        if(playerSpeed >= enemySpeed){ // 行動順の決定
            if(player.battleStatus["LP"] > 0 && enemy.battleStatus["LP"] > 0)damageCalc(6, player, enemy);
            if(player.battleStatus["LP"] > 0 && enemy.battleStatus["LP"] > 0)damageCalc(enemyCommand, enemy, player);
            
        }
        else{
            if(player.battleStatus["LP"] > 0 && enemy.battleStatus["LP"] > 0)damageCalc(enemyCommand, enemy, player);
            if(player.battleStatus["LP"] > 0 && enemy.battleStatus["LP"] > 0)damageCalc(6, player, enemy);
        }

        if(player.nowStateList["疾風の構え"] > 0 && player.skill[2]["skillName"] !== "疾風の構え") damageCalc(6, player, enemy);
        if(enemy.nowStateList["疾風の構え"] > 0 && enemy.skill[enemyCommand - 3]["skillName"] !== "疾風の構え") damageCalc(enemyCommand, enemy, player);
    }

    // 勝利後のコマンド用ボタン
    const allHeal = document.createElement("button");
    allHeal.textContent = "全回復";
    allHeal.onclick = function(){ // 全回復ボタン

        player.battleStatus["LP"] = player.normalStatus["最大LP"];
        player.battleStatus["SP"] = player.normalStatus["最大SP"];
        for(i = 0; i < 10; i++){

            messageBox[i].textContent = "";


        }
    
        currentLog = 0;
        battle();
    }

    const levelUp = document.createElement("button");
    levelUp.textContent = "レベルアップ";
    levelUp.onclick = function(){ // レベルアップボタン

        player.normalStatus["最大LP"] += Math.floor(Math.random() * 5) + 10;
        player.normalStatus["最大SP"] += Math.floor(Math.random() * 2) + 5;
        player.normalStatus["攻撃力"] += Math.floor(Math.random() * 2) + 1;
        player.normalStatus["防御力"] += Math.floor(Math.random() * 2) + 1;
        player.normalStatus["敏捷性"] += Math.floor(Math.random() * 2) + 1;
        player.normalStatus["魔力"] += Math.floor(Math.random() * 2) + 1;
        player.normalStatus["抵抗"] += Math.floor(Math.random() * 2) + 1;

        player.battleStatus["LP"] += Math.floor(player.normalStatus["最大LP"] * 0.13);
        player.battleStatus["SP"] += Math.floor(player.normalStatus["最大SP"] * 0.1);

        if(player.battleStatus["LP"] > player.normalStatus["最大LP"]) player.battleStatus["LP"] -= (player.battleStatus["LP"] - player.normalStatus["最大LP"]);
        if(player.battleStatus["SP"] > player.normalStatus["最大SP"]) player.battleStatus["SP"] -= (player.battleStatus["SP"] - player.normalStatus["最大SP"]);

        for(i = 0; i < 10; i++){

            messageBox[i].textContent = "";


        }
    
        currentLog = 0;
        battle();
    }


function start(){

    sword.remove();
    priest.remove();
    which.remove();
    knight.remove();
    assasin.remove();
    curse.remove();
    clown.remove();
    fairy.remove();
    fighter.remove();
    gameImage.remove();

    if(battleNumber <= 4){
        
        random = Math.floor(Math.random() * 5);
    }

    else if(battleNumber <= 9){

        random = Math.floor(Math.random() * 5 + 5);

    }

    else if(battleNumber <= 14){

        random = Math.floor(Math.random() * 5 + 10);

    }

    else{
        random = "混沌の神";
    }

    enemy = new actor(consecutiveList[random], "");

    if(battleNumber > 0){

        enemyCommand = 0;
        
        attackButton.remove();
        guardButton.remove();
        skillButton1.remove();
        skillButton2.remove();
        skillButton3.remove();
        skillButton4.remove();

        PictureBottom.append(allHeal);
        PictureBottom.append(levelUp);
    }
    else{
        battle();
    }

    if(battleNumber % 5 === 0 && battleNumber !== 0){
        player.level ++;
    }

    if(battleNumber === 15) last();

    messageBox[0] = "勝利！次の相手に備えてください"
}


function battle(){

    allHeal.remove();
    levelUp.remove();

    
    skillButton1.textContent = `${player.skill[0]["skillName"]}　消費SP:${player.skill[0]["spendSP"]}`;
    guardButton.id = `${player.skill[0]["skillName"]}`;

    skillButton2.textContent = `${player.skill[1]["skillName"]}　消費SP:${player.skill[1]["spendSP"]}`;
    guardButton.id = `${player.skill[1]["skillName"]}`;

    battleStatusCalc(player);

    battleStatusCalc(enemy);

    pattern = 2 + enemy.skill.length;

    mainMessage.textContent = `${battleNumber + 1}戦目　VS${enemy.name}`;

    statusPrint.textContent = `${player.name} LP: ${player.battleStatus["LP"]}\nSP: ${player.battleStatus["SP"]}`;

    Picturetop.append(statusPrint);

    //gameAudio.src = "PerituneMaterial_Battle_Fun.mp3";
    //gameAudio.play();

    if(enemy.image) gameImage.src = `image/${enemy.image}`;
    
    Picturetop.append(gameImage);
    
    PictureBottom.append(attackButton);

    PictureBottom.append(guardButton);
    
    PictureBottom.append(skillButton1);

    PictureBottom.append(skillButton2);

    if(player.skill.length > 2){

        skillButton3.textContent = `${player.skill[2]["skillName"]}　消費SP:${player.skill[2]["spendSP"]}`;
        guardButton.id = `${player.skill[2]["skillName"]}`;
        PictureBottom.append(skillButton3);
    }

    if(player.skill.length > 3){

        skillButton4.textContent = `${player.skill[3]["skillName"]}　消費SP:${player.skill[3]["spendSP"]}`;
        guardButton.id = `${player.skill[3]["skillName"]}`;
        PictureBottom.append(skillButton4);
    }

}

function battleStatusCalc(actor){

    statusPrint.textContent = `${player.name} LP: ${player.battleStatus["LP"]}\nSP: ${player.battleStatus["SP"]}`;

    
        actor.battleStatus["最大LP"] = (actor.normalStatus["最大LP"] + actor.weapon["最大LP"] + actor.armor["最大LP"]) * actor.buffList["最大LP"];
        actor.battleStatus["最大SP"] = (actor.normalStatus["最大SP"] + actor.weapon["最大SP"] + actor.armor["最大SP"]) * actor.buffList["最大SP"]; 
        actor.battleStatus["攻撃力"] = (actor.normalStatus["攻撃力"] + actor.weapon["攻撃力"] + actor.armor["攻撃力"]) * actor.buffList["攻撃力"]; 
        actor.battleStatus["防御力"] = (actor.normalStatus["防御力"] + actor.weapon["防御力"] + actor.armor["防御力"]) * actor.buffList["防御力"]; 
        actor.battleStatus["敏捷性"] = (actor.normalStatus["敏捷性"] + actor.weapon["敏捷性"] + actor.armor["敏捷性"]) * actor.buffList["敏捷性"]; 
        actor.battleStatus["魔力"] = (actor.normalStatus["魔力"] + actor.weapon["魔力"] + actor.armor["魔力"]) * actor.buffList["魔力"]; 
        actor.battleStatus["抵抗"] = (actor.normalStatus["抵抗"] + actor.weapon["抵抗"] + actor.armor["抵抗"]) * actor.buffList["抵抗"]; 
        actor.battleStatus["命中率"] = actor.normalStatus["命中率"] * actor.weapon["命中率"] * actor.armor["命中率"] * actor.buffList["命中率"]; 
        actor.battleStatus["回避率"] = actor.normalStatus["回避率"] * actor.weapon["回避率"] * actor.armor["回避率"] * actor.buffList["回避率"]; 
        actor.elementResist["物理"] = actor.elementResist["物理"] * actor.armor["物理"];
        actor.elementResist["炎"] = actor.elementResist["炎"] * actor.armor["炎"];
        actor.elementResist["水"] = actor.elementResist["水"] * actor.armor["水"];
        actor.elementResist["雷"] = actor.elementResist["雷"] * actor.armor["雷"];
        actor.elementResist["氷"] = actor.elementResist["氷"] * actor.armor["氷"];
        actor.elementResist["風"] = actor.elementResist["風"] * actor.armor["風"];
        actor.elementResist["土"] = actor.elementResist["土"] * actor.armor["土"];
        actor.elementResist["聖"] = actor.elementResist["聖"] * actor.armor["聖"];
        actor.elementResist["邪"] = actor.elementResist["邪"] * actor.armor["邪"];

    Object.keys(actor.buffturn).forEach(function(state){ //バフ,デバフの処理
        if(actor.buffturn[state] > 0){ //バフがかかっている場合の処理

            actor.buffturn[state] -= 1; // バフの残りターンを減らす

        if(actor.buffturn[state] === 0){
            messageBox[currentLog].textContent = `${actor.name}の${state}が元に戻った！`;
            currentLog += 1;
            actor.buffList[state] = 1; // バフの残りターンがなくなった時、バフの数値を1に戻す
        }

        }

    })

    Object.keys(actor.nowStateList).forEach(function(state){ //特殊状態の処理
        if(actor.nowStateList[state] > 0){ //特殊状態にかかっている場合の処理

            actor.nowStateList[state] -= 1; // 特殊状態の残りターンを減らす

            switch(state){ // 各状態異常のメッセージと効果

                case "毒":
                    messageBox[currentLog].textContent = `${actor.name}は毒に冒されている！${Math.floor(actor.normalStatus["最大LP"] / 16)}のダメージ！`;
                    currentLog += 1;
                    actor.battleStatus["LP"] -= Math.floor(actor.normalStatus["最大LP"] / 8);
                    break;

                case "暗闇":
                    actor.battleStatus["命中率"] = actor.normalStatus["命中率"] / 2;
                    break;

                case "疾風の構え":
                    actor.battleStatus["攻撃力"] = Math.floor(actor.normalStatus["攻撃力"] * 0.75);
                    actor.battleStatus["敏捷性"] = Math.floor(actor.normalStatus["敏捷性"] * 1.5);
                    actor.battleStatus["回避率"] = Math.floor(actor.normalStatus["回避率"] * 1.5);
                    break;

            }

        if(actor.nowStateList[state] === 0){
            messageBox[currentLog].textContent = `${actor.name}の${state}が消えた！`;
            currentLog += 1;
        }

        }

    })

    
}

function damageCalc(command,attacker,defender){// ダメージ計算&コマンドに対応した処理

        if(attacker.nowStateList["麻痺"] > 0 || attacker.nowStateList["睡眠"] > 0) command = 0;
        if(attacker.nowStateList["混乱"] > 0){
            command = Math.floor(Math.random() * 10);
        }

        switch(command){


            case 0:
                messageBox[currentLog].textContent = `${attacker.name}は動けない!`;
                currentLog += 1;
                break;

            case 1:
                messageBox[currentLog].textContent = `${attacker.name}の攻撃！`;
                currentLog += 1;

                random = Math.random();
    
                if(random <= attacker.battleStatus["命中率"] - defender.battleStatus["回避率"]){ // 乱数が命中率-相手の回避率の数値より小さかった場合，攻撃成功（命中）
                    damage = Math.floor((attacker.battleStatus["攻撃力"] * 2 - defender.battleStatus["防御力"]) * defender.elementResist[attacker.weapon["属性"]] * (Math.random() * 0.4 + 0.8));
    
    
                    if(damage > 0){
                        defender.battleStatus["LP"] -= damage;
                        messageBox[currentLog].textContent = `${damage}のダメージ！`;
                        currentLog += 1;
                    }
    
                    else{
                        messageBox[currentLog].textContent = "ミス！";
                        currentLog += 1;
    
                    }
    
                }else{
                    messageBox[currentLog].textContent = "ミス！";
                    currentLog += 1;
    
                }
    
    
                
                break;

            case 2:
                messageBox[currentLog].textContent = `${attacker.name}は防御している！`;
                currentLog += 1;
                attacker.battleStatus["防御力"] *= 2;
                attacker.battleStatus["抵抗"] *= 2;
                
                break
    
            default: // スキル使用時のコマンド
                
                skillCommand = command - 3; // スキルのコマンドは3～8に割り当てられている

                if(attacker.skill.length < skillCommand){

                    random = Math.random();

                    if(random <= 0.5){
                        messageBox[currentLog].textContent = `${attacker.name}は動けない！`;
                        currentLog += 1;
                    } 
                    else{
                        messageBox[currentLog].textContent = `${attacker.name}は自分自身を攻撃した！${attacker.battleStatus["攻撃力"] * 1.5}のダメージ！`
                        currentLog += 1;
                    }

                    break;
                }

                else if(attacker.battleStatus["SP"] >= attacker.skill[skillCommand]["spendSP"]){

                    attacker.battleStatus["SP"] -= attacker.skill[skillCommand]["spendSP"];

                    messageBox[currentLog].textContent = `${attacker.name}は${attacker.skill[skillCommand]["skillName"]}を使った!${attacker.skill[skillCommand]["message"]}`;
                    currentLog += 1;

                    if(attacker.skill[skillCommand]["target"] === "敵"){

                        for(let skillNumber = 0; skillNumber < attacker.skill[skillCommand]["number"]; skillNumber++){
    
                            random = Math.random();
    
                            if(random <= attacker.battleStatus["命中率"] * attacker.skill[skillCommand]["hit"] - defender.battleStatus["回避率"]){ // 乱数が命中率-回避率より低ければ命中
                                
                                if(attacker.skill[skillCommand]["rate"] > 0){ // 攻撃スキルだった場合の処理
    
                                    damage = Math.floor(attacker.battleStatus[attacker.skill[skillCommand]["attackStatus"]] * attacker.skill[skillCommand]["rate"] - defender.battleStatus[attacker.skill[skillCommand]["deffenceStatus"]] * defender.elementResist[attacker.skill[skillCommand]["element"]] * (Math.random() * 0.4 + 0.8));
    
                                    if(damage > 0 && attacker.skill[skillCommand]["skillType"] === "物理"){
                                        defender.battleStatus["LP"] -= damage;
                                        messageBox[currentLog].textContent = `${damage}のダメージ！`;
                                        currentLog += 1;
                                    }
                                    else if(damage > 0 && attacker.skill[skillCommand]["skillType"] === "魔法" && defender.nowStateList["魔法反射"] < 1){
                                        defender.battleStatus["LP"] -= damage;
                                        messageBox[currentLog].textContent = `${damage}のダメージ！`
                                        currentLog += 1;
                                    }
                                    else if(damage > 0 && attacker.skill[skillCommand]["skillType"] === "魔法" && defender.nowStateList["魔法反射"] > 0){
                                        attacker.battleStatus["LP"] -= damage;
                                        messageBox[currentLog].textContent = `魔法が跳ね返ってきた！${attacker.name}に${damage}のダメージ！`
                                        currentLog += 1;
                                    }
                                    else{
                                        messageBox[currentLog].textContent = "ミス！"
                                        currentLog += 1;;
                    
                                    }
    
                                }
    
                                if(attacker.skill[skillCommand]["buff"] !== ""){ // デバフ効果がついていた場合の処理

                                    if(attacker.skill[skillCommand]["skillType"] === "物理" || defender.nowStateList["魔法反射"] < 1){

                                        defender.buffList[attacker.skill[skillCommand]["buff"]] = 0.5;
                                        defender.buffturn[attacker.skill[skillCommand]["buff"]] = 3;
            
                                        messageBox[currentLog].textContent = `${defender.name}の${attacker.skill[skillCommand]["buff"]}が下がった!`;
                                        currentLog += 1;
                                            

                                    }
                                    if(attacker.skill[skillCommand]["skillType"] === "魔法" && defender.nowStateList["魔法反射"] > 0){

                                        attacker.buffList[attacker.skill[skillCommand]["buff"]] = 0.5;
                                        attacker.buffturn[attacker.skill[skillCommand]["buff"]] = 3;
            
                                        messageBox[currentLog].textContent = `魔法が跳ね返ってきた！${attacker.name}の${buff}が下がった!`;
                                        currentLog += 1;

                                    }
                                    
    
    
                                }
    
                                if(attacker.skill[skillCommand]["state"][0] !== ""){ // 状態異常効果がついていた場合の処理

                                    random = Math.random();
    
                                    if(random <= attacker.skill[skillCommand]["state"][1] * defender.specialStateResist[attacker.skill[skillCommand]["state"][0]]){

                                        

                                        if(attacker.skill[skillCommand]["skillType"] === "物理" || defender.nowStateList["魔法反射"] < 1){

                                            messageBox[currentLog].textContent = `${defender.name}は${attacker.skill[skillCommand]["state"][0]}になった！`;
                                            currentLog += 1;
    
                                            defender.nowStateList[attacker.skill[skillCommand]["state"][0]] = 3;

                                        }
                                        if(attacker.skill[skillCommand]["skillType"] === "魔法" && defender.nowStateList["魔法反射"] > 0){

                                            messageBox[currentLog].textContent = `魔法が跳ね返ってきた！${attacker.name}は${attacker.skill[skillCommand]["state"][0]}になった！`;
                                            currentLog += 1;
    
                                            attacker.nowStateList[attacker.skill[skillCommand]["state"][0]] = 3;

                                        }
    
                                        
    
                                    }else if(attacker.skill[skillCommand]["rate"] === 0){
    
                                        messageBox[currentLog].textContent = "失敗した!";
                                        currentLog += 1;
                                    }
                                    
    
                                }
                
                            }
                
                            else{
                                messageBox[currentLog].textContent = "ミス！";
                                currentLog += 1;
                
                            }
    
                        }
                    }
                    if(attacker.skill[skillCommand]["target"] === "自分"){
    
                        for(let skillNumber = 0; skillNumber < attacker.skill[skillCommand]["number"]; skillNumber++){
    
                                
                                if(attacker.skill[skillCommand]["rate"] > 0){ // 回復スキルだった場合の処理
    
                                    heal = Math.floor(attacker.battleStatus["最大LP"] * attacker.skill[skillCommand]["rate"] * (Math.random() * 0.4 + 0.8));
    
                                    if(heal > 0){
                                        attacker.battleStatus["LP"] += heal;
                                        messageBox[currentLog].textContent = `${heal}回復した！`;
                                        currentLog += 1;
    
                                        if(attacker.battleStatus["LP"] > attacker.battleStatus["最大LP"]){

                                            attacker.battleStatus["LP"] -= (attacker.battleStatus["LP"] - attacker.battleStatus["最大LP"]);
                                            

                                        } 
                                    }
                                    else{
                                        messageBox[currentLog].textContent = "ミス！";
                                        currentLog += 1;
                    
                                    }
    
                                }
    
                                if(attacker.skill[skillCommand]["buff"] !== ""){ // バフ効果がついていた場合の処理
    
                                    if(attacker.skill[skillCommand]["skillType"] === "物理" || defender.nowStateList["魔法反射"] < 1){

                                        attacker.buffList[attacker.skill[skillCommand]["buff"]] = 1.5;
                                        attacker.buffturn[attacker.skill[skillCommand]["buff"]] = 3;
            
                                        messageBox[currentLog].textContent = `${attacker.name}の${attacker.skill[skillCommand]["buff"]}が上がった!`;
                                        currentLog += 1;
                                            

                                    }
    
                                }
    
                                if(attacker.skill[skillCommand]["state"][0] !== ""){ // 特殊状態付与がついていた場合の処理
    
                                    random = Math.random();
    
                                    messageBox[currentLog].textContent = `${attacker.name}は${attacker.skill[skillCommand]["state"][0]}になった！`;
                                    currentLog += 1;
    
                                    attacker.nowStateList[attacker.skill[skillCommand]["state"][0]] = 3;
    
                                    
                                    
    
                                }
    
                        }
                    
                }

                switch(attacker.skill[skillCommand]["specialFlag"]){

                    case 1:
                        if(attacker.buffList["防御力"] <= 1){
                            attacker.buffList["防御力"] = 1.5;
                            attacker.buffturn["防御力"] = 2;
            
                            messageBox[currentLog].textContent = `${attacker.name}の防御力が上がった!`;
                            currentLog += 1;
                        }
                        
                        break;

                    case 2:
                        if(damage > 0){
                            messageBox[currentLog].textContent = `${attacker.name}は${Math.floor(damage / 2)}回復した！`;
                            currentLog += 1;

                            attacker.battleStatus["LP"] += Math.floor(damage / 2);

                            if(attacker.battleStatus["最大LP"] > attacker.battleStatus["LP"]) attacker.battleStatus["LP"] - (attacker.battleStatus["最大LP"] - attacker.battleStatus["LP"]);
                        }
                        break;

                    case 3:
                        attacker.buffList["魔力"] = 1.5;
                        attacker.buffturn["魔力"] = 3;
                        messageBox[currentLog].textContent = `${attacker.name}の魔力が上がった!`;
                        currentLog += 1;

                        defender.buffList["防御力"] = 0.5;
                        defender.buffList["抵抗"] = 0.5;
                        attacker.buffturn["防御力"] = 3;
                        attacker.buffturn["抵抗"] = 3;
                
                        messageBox[currentLog].textContent = `${defender.name}の防御力と抵抗が下がった!`;
                        currentLog += 1;
                        break;

                    case 4:
                        damage = 0;

                        Object.keys(defender.nowStateList).forEach(function(state){ //特殊状態の処理
                            if(defender.nowStateList[state] > 0){ //特殊状態にかかっている場合の処理
                    
                                if(state === "毒"|| state === "麻痺"|| state === "睡眠"|| state === "暗闇"|| state === "混乱") damage++;
                    
                            }
                    
                        })

                        messageBox[currentLog].textContent = `${defender.name}に${10 + damage * 30 * player.level}のダメージ！`;
                        currentLog += 1;
                        defender.battleStatus["LP"] -= 10 + damage * 30 * player.level;
                        break;

                    case 5:
                        attacker.buffturn["攻撃力"] = 5;
                        attacker.buffList["防御力"] = 1.5;
                        attacker.buffturn["防御力"] = 5;
                    
                        messageBox[currentLog].textContent = `${attacker.name}の防御力が上がった！`;
                        currentLog += 1;
                        break;

                    case 6:
                        defender.buffturn["攻撃力"] = 5;
                        defender.buffList["防御力"] = 0.5;
                        defender.buffturn["防御力"] = 5;
                
                        messageBox[currentLog].textContent = `${defender.name}の防御力が下がった!`;
                        currentLog += 1;
                        break;

                default:
                }

                }else{
                    messageBox[currentLog].textContent = "SPがたりない！";
                    currentLog += 1;
                }

                

        }


        actionNumber++;
        

        if(actionNumber >= 2){
            battleStatusCalc(player);
            battleStatusCalc(enemy);

            actionNumber = 0;
        }

        if(player.battleStatus["LP"] <= 0){
            messageBox[currentLog].textContent = `${player.name}は力尽きた!`;
            for(i = 0; i < 10; i++){

                messageBox[i].textContent = "";
    
    
            }
            currentLog = 0;

            end();
        }
        if(enemy.battleStatus["LP"] <= 0){
            for(i = 0; i < 10; i++){

                messageBox[i].textContent = "";
    
    
            }
            currentLog = 0;

            messageBox[0].textContent = `${enemy.name}は倒れた!勝利!`;
            messageBox[1].textContent = "次の相手に備えてください";
            messageBox[2].textContent = "全回復：LPとSPを全回復"
            messageBox[3].textContent = "レベルアップ：全ステータス永続アップ＋LPとSPが10%回復"
            battleNumber++;
            
            start();
        }
}


function end(){

        PictureBottom.remove();
        statusPrint.remove();

        gameImage = `${battleNumber}人抜き！`;
        Picturetop.append(gameImage);

}

function last(){
    PictureBottom.remove();
    statusPrint.remove();
    for(i = 0; i < 10; i++){

        messageBox[i].textContent = "";


    }
    mainMessage.textContent = "ゲームクリア！おめでとう！";
}