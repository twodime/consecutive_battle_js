export class myCharacter{

    name = ""; // プレイヤー名
    job = "闘士"; // ジョブ名

    normalStatus = {"最大LP": 100, "最大SP": 10,"LP": 100, "SP": 10, "攻撃力": 10, "防御力": 10, "敏捷性": 10, "魔力": 10, "抵抗": 10,
                    "回避率": 0.05}; // 通常時のステータス

    battleStatus = {"最大LP": 100, "最大SP": 10,"LP": 100, "SP": 10, "攻撃力": 10, "防御力": 10, "敏捷性": 10, "魔力": 10, "抵抗": 10,
                    "回避率": 0.05}; // バトル時のステータス、武器補正込み

    skill = []; // スキルリスト

    elmentResist = {"物理": 1.0, "炎": 1.0, "水": 1.0, "雷": 1.0, "氷": 1.0, "風": 1.0, "土": 1.0, "聖": 1.0, "邪": 1.0};

    specialStateResist = {"毒": 1.0, "麻痺": 1.0, "暗闇": 1.0, "睡眠": 1.0}; 

    buffList = {"最大LP": 1.0, "最大SP": 1.0,"LP": 1.0, "SP": 1.0, "攻撃力": 1.0, "防御力": 1.0, "敏捷性": 1.0, "魔力": 1.0, "抵抗": 1.0,
    "回避率": 1.0}; // バフリスト。バトル時のステータスは常にこの補正がかかっている。

    weapon = {"ID": 0, "武器名": "なし", "耐久値": 0, "最大LP": 0, "最大SP": 0,"LP": 0, "SP": 0, "攻撃力": 0, "防御力": 0, "敏捷性": 0, "魔力": 0, "抵抗": 0,
    "回避率": 0}; // 武器

    item = []; // アイテム

    nowStateList = {"毒": 1.0, "麻痺": 1.0, "暗闇": 1.0, "睡眠": 1.0};

}

myCharacter.prototype.statusDifinition = function(job){

}