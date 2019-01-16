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
            .then((db: SQLiteObject) => {
                console.log('bdd créée!!!')
                this.db = db;
                this.createTables();
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
            this.db.executeSql("INSERT INTO `defi` (`idTheme`, `titre`, `etat`, `type`) VALUES (" + getIDTheme[i++].id + ", 'Technologie féminine', 1, 'quiz')", [])
                .catch(e => console.log(e + " " + i));
            /*this.db.executeSql("INSERT INTO `defi` (`idTheme`, `titre`, `etat`, `type`) VALUES (" + getIDTheme[i++].id + ", 'Send nudes', 0, 'action')", [])
                .catch(e => console.log(e + " " + i));*/
            this.db.executeSql("INSERT INTO `defi` (`idTheme`, `titre`, `etat`, `type`) VALUES (" + getIDTheme[i++].id + ", 'Le codage pour les nuls', 0, 'quiz')", [])
                .catch(e => console.log(e + " " + i));
            /*this.db.executeSql("INSERT INTO `defi` (`idTheme`, `titre`, `etat`, `type`) VALUES (" + getIDTheme[i++].id + ", 'Programmez un programme', 0, 'action')", [])
                .catch(e => console.log(e + " " + i));*/
            this.db.executeSql("INSERT INTO `defi` (`idTheme`, `titre`, `etat`, `type`) VALUES (" + getIDTheme[i++].id + ", 'Préjugés', 0, 'quiz')", [])
                .catch(e => console.log(e + " " + i));
            /*this.db.executeSql("INSERT INTO `defi` (`idTheme`, `titre`, `etat`, `type`) VALUES (" + getIDTheme[i++].id + ", 'Percez un bouton', 0, 'action')", [])
                .catch(e => console.log(e + " " + i));*/
            this.db.executeSql("INSERT INTO `defi` (`idTheme`, `titre`, `etat`, `type`) VALUES (" + getIDTheme[i].id + ", 'Linformatique pour les nuls', 0, 'quiz')", [])
                .catch(e => console.log(e + " " + i));
            /*this.db.executeSql("INSERT INTO `defi` (`idTheme`, `titre`, `etat`, `type`) VALUES (" + getIDTheme[i++].id + ", 'La vérité', 0, 'action')", [])
                .catch(e => console.log(e + " " + i));*/
            this.insertQuestion();

        });
    }

    insertQuestion() {
        this.selectData("", "defi", "*").then((getIDDefi) => {
            let i = 0;
            //Défi sur les femmes dans l'info
            this.db.executeSql("INSERT INTO `question` (`intitule`, `textePresentation`, `idDefi`) VALUES ('Laquelle de ces personnes est considérée comme la pionnière de la technologie Wifi ?', '', " + getIDDefi[i].id + "), ('Qui a été la première personne à imaginer linformatique ?', '', " + getIDDefi[i].id + "), ('Qui a conçu le premier ordinateur au monde ?', '', " + getIDDefi[i].id + "), ('Le cobol est un langage de programmation créé en 1959. Il est encore utilisé aujourd’hui, surtout dans le domaine des banques. Qui est linventeur de ce langage de programmation ?', '', " + getIDDefi[i].id + "), ('Qui a conçu les logiciels de guidage du vaisseau de la mission lunaire Apollo ?', '', " + getIDDefi[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            //Défi Prendre en photo une informaticienne
            /*this.db.executeSql("INSERT INTO `question` (`intitule`, `textePresentation`, `idDefi`) VALUES ('Votre mission est de scanner le QR Code de 3 informaticiennes. GO!', '', " + getIDDefi[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));*/
            //Défi le codage pour les nuls
            this.db.executeSql("INSERT INTO `question` (`intitule`, `textePresentation`, `idDefi`) VALUES ('Quel est lintrus ?', '', " + getIDDefi[i].id + "), ('Quel est le premier langage de programmation ?', '', " + getIDDefi[i].id + "), ('Trouvez un intru parmi ces conditions arithmétiques :', '', " + getIDDefi[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            //Défi Préjugés
            this.db.executeSql("INSERT INTO `question` (`intitule`, `textePresentation`, `idDefi`) VALUES ('Un informaticien est souvent :', '', " + getIDDefi[i].id + "), ('Un informaticien travaille le plus souvent :', '', " + getIDDefi[i].id + "), ('Un informaticien peut :', '', " + getIDDefi[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            //Defi Les chiffres en info
            this.db.executeSql("INSERT INTO `question` (`intitule`, `textePresentation`, `idDefi`) VALUES ('A votre avis, combien faudrait il de temps pour hacker le mot de passe 12345 ?', '', " + getIDDefi[i].id + "), ('Quelle quantité de données est produite par lhumanité chaque seconde ?', '', " + getIDDefi[i].id + "), ('À votre avis, combien demplois en informatique étaient vacants à la fin de lannée 2018 ?', '', " + getIDDefi[i].id + "), ('Lordinateur le plus puissant au monde (conçu par IBM) peut effectuver 200 millions de milliards de calculs par seconde. Quel est son prix ?', '', " + getIDDefi[i++].id + ")", [])
                .catch(e => console.log(e));

            /*this.db.executeSql("INSERT INTO `question` (`intitule`, `textePresentation`, `idDefi`) VALUES", [])
                .catch(e => console.log(e + " " + i));*/
            this.insertReponse();
        });
    }

    insertReponse() {
        this.selectData("", "question", "*").then((getIDQuestion) => {
            let i = 0;
            //Réponses Quiz 1
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (1, 'Hedy Lamarr', '--', " + getIDQuestion[i].id + "), (0, 'Sean Connery', '', " + getIDQuestion[i].id + "), (0, 'Steve Jobs', '', " + getIDQuestion[i].id + "), (0, 'Micheal Jordan', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, 'MiCode', '', " + getIDQuestion[i].id + "), (0, 'Bill Gates', '', " + getIDQuestion[i].id + "), (1, 'Ada Lovelace', '', " + getIDQuestion[i].id + "), (0, 'René Descartes', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, 'Larry Tesler', '', " + getIDQuestion[i].id + "), (1, 'Jean Bartik', '', " + getIDQuestion[i].id + "), (0, 'Douglas Engelbart', '', " + getIDQuestion[i].id + "), (0, 'James Gosling', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (1, 'Grace Hopper', '', " + getIDQuestion[i].id + "), (0, 'Stephen Hawking', '', " + getIDQuestion[i].id + "), (0, 'Mark Zuckerberg', '', " + getIDQuestion[i].id + "), (0, 'Markus Persson', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (1, 'David Clark', '', " + getIDQuestion[i].id + "), (0, 'Tim Paterson', '', " + getIDQuestion[i].id + "), (1, 'Margaret Hamilton', '', " + getIDQuestion[i].id + "), (0, 'Pierre Curie', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));

            // Réponses Quiz 2
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, 'C', '--', " + getIDQuestion[i].id + "), (1, 'C4', '', " + getIDQuestion[i].id + "), (0, 'C#', '', " + getIDQuestion[i].id + "), (0, 'C++', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, 'Swift', '--', " + getIDQuestion[i].id + "), (1, 'A0-System', '', " + getIDQuestion[i].id + "), (0, 'HTML', '', " + getIDQuestion[i].id + "), (0, 'Python', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, 'SWITCH', '--', " + getIDQuestion[i].id + "), (0, 'SI', '', " + getIDQuestion[i].id + "), (0, 'TANT QUE', '', " + getIDQuestion[i].id + "), (1, 'POURQUOI PAS', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));

            //Réponses Quiz 3
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, 'Petit', '--', " + getIDQuestion[i].id + "), (0, 'Asocial', '', " + getIDQuestion[i].id + "), (0, 'Avec des lunettes', '', " + getIDQuestion[i].id + "), (1, 'Normal', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, 'Seul', '--', " + getIDQuestion[i].id + "), (1, 'En équipe', '', " + getIDQuestion[i].id + "), (0, 'A deux', '', " + getIDQuestion[i].id + "), (0, 'Il ne travaille pas', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (1, 'Cela dépend de son domaine de compétence', '--', " + getIDQuestion[i].id + "), (0, 'Hacker un site en quelques minutes', '', " + getIDQuestion[i].id + "), (0, 'Réparer une imprimante défaillante', '', " + getIDQuestion[i].id + "), (0, 'Vous envoyer dans la matrice', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));

            //Réponses Quiz 4
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, '1 jour', '--', " + getIDQuestion[i].id + "), (0, '1 heure', '', " + getIDQuestion[i].id + "), (0, '1 seconde', '', " + getIDQuestion[i].id + "), (1, '1 nano-seconde', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, '20 000 GB', '--', " + getIDQuestion[i].id + "), (0, '200 000 GB', '', " + getIDQuestion[i].id + "), (1, '2 000 000 GB', '', " + getIDQuestion[i].id + "), (0, '20 000 000 GB', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, '1', '--', " + getIDQuestion[i].id + "), (0, '1 000', '', " + getIDQuestion[i].id + "), (0, '7 000', '', " + getIDQuestion[i].id + "), (1, '13 000', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, '24 000 000€', '--', " + getIDQuestion[i].id + "), (1, '240 000 000€', '', " + getIDQuestion[i].id + "), (0, '2 400 000 000€', '', " + getIDQuestion[i].id + "), (0, '24 000 000 000€', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            /*this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES", [])
                .catch(e => console.log(e + " " + i));*/
            this.insertExplication();
        });
    }

    insertExplication() {
        /*this.selectData("", "question", "*").then((getIDQuestion) => {
        
                    this.selectData("", "theme", "*").then((getIDTheme) => {
                        let question=0;
                        let theme=0;
                        this.db.executeSql("INSERT INTO `explication` (`titre`, `image`, `texte`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('Hedy Lamarr créatice de la wifi', 'image', 'Cette femme est responsable de la création de l''informatique', 'bouton', 'en savoir plus', "+ getIDQuestion[question].id +", 0)", [])
                            .catch(e => console.log(e + " " + i));
                        this.db.executeSql("INSERT INTO `explication` (`titre`, `image`, `texte`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('Ada Lovelace a imaginé linformatique', 'image', 'Une femme a imaginer linformatique', 'bouton', 'En savoir plus', "+ getIDQuestion[question].id +", 0)", [])
                            .catch(e => console.log(e + " " + i));
                        this.db.executeSql("INSERT INTO `explication` (`titre`, `image`, `texte`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('Les femmes sont informaticiennes', 'image', 'Nous pouvons voir que les femmes sont informaticiennes', 'bouton', 'En savoir plus', 0, "+ getIDTheme[theme].id +")", [])
                            .catch(e => console.log(e + " " + i));
                        /*this.db.executeSql("INSERT INTO `explication` (`titre`, `image`, `texte`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ", [])
                            .catch(e => console.log(e + " " + i));
                    });
                })*/
    }


    //Pour modifier le contenu de la base de données
    setData(table: string, attribut: string, valeur: any, fin: string) {

        let requete: string = "update `" + table + "` set `" + attribut + "` = " + valeur + " " + fin;
        console.log("SQLSERVICE --------- Requête UPDATE: ", requete);
        this.db.executeSql(requete, [])
            .then(() => console.log("SQLSERVICE --- Update ok"))
            .catch(e => console.log(e));
    }



    //Pour lire des données de la base
    selectData(fin: any, table: string, attribut: string): Promise<Array<any>> {

        let res: Array<any> = [];
        let requete: string = "select " + attribut + " from `" + table + "` " + fin;
        console.log("SQLSERVICE --------- Requête INSERT: ", requete);

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


    setReference(ref: firebase.database.Reference) {
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