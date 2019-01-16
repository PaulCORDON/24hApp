import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Injectable } from "@angular/core";
import { ToastController } from 'ionic-angular';


/*!!!!!!!
ligne à mettre dans la page d'accueil de l'appli:

this.sqliteService.createDataBaseFile();

cela crééra toute la base de donnée
!!!!!!!!!*/

@Injectable()
export class SQLiteService {

    private db: SQLiteObject;
    idTheme: number;
    constructor(private sqlite: SQLite, private toastCtrl: ToastController) {

    }
    
        createDataBaseFile(): void {
            this.sqlite.create({
                name: 'data.db',
                location: 'default'
            })
            .catch(e => console.log("erreur creation bdd: " + e));
    }

    createTables(): void {

        /*creation de la table toto*/
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `theme` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `nom` varchar(500) NOT NULL UNIQUE, `progression` int(5) NOT NULL, `nbTicketActuel` int(3) NOT NULL, `nbTicketMax` int(3) NOT NULL)', []).catch(e => console.log(e));
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `question` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `intitule` varchar(500) NOT NULL UNIQUE, `textePresentation` varchar(1000) NOT NULL, `idDefi` int(11) NOT NULL )', []).catch(e => console.log(e));
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `reponse` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `isReponse` tinyint(1) NOT NULL, `nom` varchar(500) NOT NULL UNIQUE, `image` varchar(1000) NOT NULL, `idQuestion` int(3) NOT NULL )', []).catch(e => console.log(e));
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `explication` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `titre` varchar(500) NOT NULL UNIQUE, `image` varchar(500) NOT NULL, `texte` varchar(1000) NOT NULL, `titreBouton` varchar(500) NOT NULL, `texteBouton` varchar(500) NOT NULL, `idQuestion` int(3) NOT NULL, `idTheme` int(11) NOT NULL )', []).catch(e => console.log(e));
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `defi` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `idTheme` int(3) NOT NULL, `titre` varchar(500) NOT NULL UNIQUE, `etat` int(1) NOT NULL, `type` varchar(100) NOT NULL )', []).catch(e => console.log(e));
        this.insertInTable();
    }

    insertInTable() {
        this.db.executeSql("INSERT INTO `theme` (`nom`, `progression`, `nbTicketActuel`, `nbTicketMax`) VALUES ('La place des femmes dans linformatique', 0, 0, 0), ('Le code / La programmation', 0, 0, 0), ('Trouvez des geeks', 0, 0, 0), ('Culture informatique', 0, 0, 0)", [])
            .catch(e => console.log(e));
            this.insertDefi();
    }

    insertDefi() {
        this.selectData("", "theme", "*").then((getIDTheme) => {
            let i = 0;
            this.db.executeSql("INSERT INTO `defi` (`idTheme`, `titre`, `etat`, `type`) VALUES (" + getIDTheme[i].id + ", 'Technologie féminine', 1, 'quiz')", [])
                .catch(e => console.log(e));
            this.db.executeSql("INSERT INTO `defi` (`idTheme`, `titre`, `etat`, `type`) VALUES (" + getIDTheme[i++].id + ", 'Send nudes', 0, 'action')", [])
                .catch(e => console.log(e));
            this.db.executeSql("INSERT INTO `defi` (`idTheme`, `titre`, `etat`, `type`) VALUES (" + getIDTheme[i].id + ", 'Le codage pour les nuls',1, 'quiz')", [])
                .catch(e => console.log(e));
            this.db.executeSql("INSERT INTO `defi` (`idTheme`, `titre`, `etat`, `type`) VALUES (" + getIDTheme[i++].id + ", 'Programmez un programme', 0, 'action')", [])
                .catch(e => console.log(e));
            this.db.executeSql("INSERT INTO `defi` (`idTheme`, `titre`, `etat`, `type`) VALUES (" + getIDTheme[i].id + ", 'Les boutons', 0, 'quiz')", [])
                .catch(e => console.log(e));
            this.db.executeSql("INSERT INTO `defi` (`idTheme`, `titre`, `etat`, `type`) VALUES (" + getIDTheme[i++].id + ", 'Percez un bouton', 0, 'action')", [])
                .catch(e => console.log(e));
            this.db.executeSql("INSERT INTO `defi` (`idTheme`, `titre`, `etat`, `type`) VALUES (" + getIDTheme[i].id + ", 'Les cultes', 0, 'quiz')", [])
                .catch(e => console.log(e));
            this.db.executeSql("INSERT INTO `defi` (`idTheme`, `titre`, `etat`, `type`) VALUES (" + getIDTheme[i++].id + ", 'La vérité', 0, 'action')", [])
                .catch(e => console.log(e));
            this.insertQuestion();

        });
    }

    insertQuestion() {
        this.selectData("", "defi", "*").then((getIDDefi) => {
            let i = 0;
            this.db.executeSql("INSERT INTO `question` (`intitule`, `textePresentation`, `idDefi`) VALUES ('Laquelle de ces personnes est considérée comme la pionnière de la technologie Wifi ?', 'Texte de présentation au cas où', " + getIDDefi[i].id + "), ('Qui a été la première personne à imaginer l’informatique ?', 'Imagination is key', " + getIDDefi[i++].id + ")", [])
                .catch(e => console.log(e));
            this.db.executeSql("INSERT INTO `question` (`intitule`, `textePresentation`, `idDefi`) VALUES ('Quel est lintrus ?', 'Imagination is key', " + getIDDefi[i].id + "), ('Quelle est le sigle pour le if ?', 'Imagination is key', " + getIDDefi[i].id + "), ('Quelle ce quun IDE ?', 'Imagination is key', " + getIDDefi[i++].id + ")", [])
                .catch(e => console.log(e));
            /*this.db.executeSql("INSERT INTO `question` (`intitule`, `textePresentation`, `idDefi`) VALUES", [])
                .catch(e => console.log(e));*/
                this.insertReponse();
        });
    }

    insertReponse() {
        this.selectData("", "question", "*").then((getIDQuestion) => {
            let i = 0;
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (1, 'Hedy Lamarr', '--', " + getIDQuestion[i].id + "), (0, 'Sean Connery', '', " + getIDQuestion[i].id + "), (0, 'Steve Jobs', '', " + getIDQuestion[i].id + "), (0, 'Micheal Jordan', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (1, 'Ada Lovelace', '', " + getIDQuestion[i].id + "), (0, 'Bill Gates', '', " + getIDQuestion[i].id + "), (0, 'Christophe Buyse', '', " + getIDQuestion[i].id + "), (0, 'Youssef Serrestou', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, 'C', '--', " + getIDQuestion[i].id + "), (1, 'C4', '', " + getIDQuestion[i].id + "), (0, 'C#', '', " + getIDQuestion[i].id + "), (0, 'C++', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, 'AUTRE', '--', " + getIDQuestion[i].id + "), (1, 'SI', '', " + getIDQuestion[i].id + "), (0, 'QUOI', '', " + getIDQuestion[i].id + "), (0, 'NON', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (1, 'Logiciel pour programmer', '--', " + getIDQuestion[i].id + "), (0, 'Une idee', '', " + getIDQuestion[i].id + "), (0, 'Une entreprise', '', " + getIDQuestion[i].id + "), (0, 'Un langage', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e));
            /*this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES", [])
                .catch(e => console.log(e));*/
                this.insertExplication();
        });
    }

    insertExplication() {
        /*this.selectData("", "question", "*").then((getIDQuestion) => {
        
                    this.selectData("", "theme", "*").then((getIDTheme) => {
                        let question=0;
                        let theme=0;
                        this.db.executeSql("INSERT INTO `explication` (`titre`, `image`, `texte`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('Hedy Lamarr créatice de la wifi', 'image', 'Cette femme est responsable de la création de l''informatique', 'bouton', 'en savoir plus', "+ getIDQuestion[question].id +", 0)", [])
                            .catch(e => console.log(e));
                        this.db.executeSql("INSERT INTO `explication` (`titre`, `image`, `texte`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('Ada Lovelace a imaginé linformatique', 'image', 'Une femme a imaginer linformatique', 'bouton', 'En savoir plus', "+ getIDQuestion[question].id +", 0)", [])
                            .catch(e => console.log(e));
                        this.db.executeSql("INSERT INTO `explication` (`titre`, `image`, `texte`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('Les femmes sont informaticiennes', 'image', 'Nous pouvons voir que les femmes sont informaticiennes', 'bouton', 'En savoir plus', 0, "+ getIDTheme[theme].id +")", [])
                            .catch(e => console.log(e));
                        /*this.db.executeSql("INSERT INTO `explication` (`titre`, `image`, `texte`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ", [])
                            .catch(e => console.log(e));
                    });
                })*/
    }


    //Pour modifier le contenu de la base de données
    setData(trucAchanger: string, endroitOuChanger: string, table: string) {

        let requete: string = "update `" + table + "` set ...=\"" + trucAchanger + "\" where ...=\"" + endroitOuChanger + "\"";
        this.db.executeSql(requete, [])
            .then(() => console.log('mise a jour toto effectuée !'))
            .catch(e => console.log(e));
    }



    //Pour lire des données de la base
    selectData(fin: any, table: string, attribut: string): Promise<Array<any>> {

        let res: Array<any> = [];
        let requete: string = "select " + attribut + " from `" + table + "` " + fin;
        console.log("SQLSERVICE --------- Requête : ", requete);

        return new Promise((resolve) => {
            this.db.executeSql(requete, [])
                .then(data => {
                    if (data.rows) {
                        if (data.rows.length > 0) {
                            for (var i = 0; i < data.rows.length; i++) {
                                res.push(data.rows.item(i));
                                console.log("SQLSERVICE --------- " + i, data.rows.item(i));
                            }
                        }
                    }

                    resolve(res);
                })
                .catch(e => {
                    console.log("ca a pas marché: " + e);
                });
        });
    }

    
    setReference(ref: firebase.database.Reference){
        console.log("dans le set ref ");
        console.log(ref);
        this.db.executeSql("INSERT INTO `reference` (`reference`) VALUES (\"" + ref + "\")", [])
        .then(() => console.log('reference insertion réussi!'))
        .catch(e => console.log(e));
    }
















    /*selectData(fin: any, table: string, attribut: string): Promise<Array<any>> {
        let res :Array<any> = [];
        let requete: string = "select " + attribut + " from `" + table + "`" + fin;
        console.log(requete);

        return new Promise((resolve) => {
            if (this.db != null) {
                this.db.executeSql(requete, [])
                .then(data => {
                    if(data.rows){
                        if(data.rows.length>0){
                            for(var i=0; i<data.rows.length;i++){
                                res.push(data.rows.item(i));
                                //console.log("SelectData " + i, data.rows.item(i));
                            }
                        }
                    }
                    
                    resolve(res);
                })
                .catch(e => {
                    console.log("ca a pas marché: " + e);
                });
            }
        });
    }*/


}