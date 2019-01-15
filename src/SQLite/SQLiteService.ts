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
    
        /*createDataBaseFile(): void {
    
            this.selectData("", "theme", "*").then((data) => {
                if (data == []) {
                    console.log("on est là")
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
                else
                    console.log("La BDD est déjà créée")
            });
        }*/


    createTables(): void {

        /*creation de la table toto*/
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `theme` ( `id` int(5) NOT NULL UNIQUE, `nom` varchar(500) NOT NULL, `progression` int(5) NOT NULL, `nbTicketActuel` int(3) NOT NULL, `nbTicketMax` int(3) NOT NULL)', [])
            .then(() => {
                console.log('table theme created!')
            });

        this.db.executeSql('CREATE TABLE IF NOT EXISTS `question` ( `id` int(100) NOT NULL UNIQUE, `intitule` varchar(500) NOT NULL, `textePresentation` varchar(1000) NOT NULL, `idDefi` int(11) NOT NULL )', [])
            .then(() => {
                console.log('table question created!')
            });

        this.db.executeSql('CREATE TABLE IF NOT EXISTS `propositionQuiz` ( `id` int(100) NOT NULL UNIQUE, `isReponse` tinyint(1) NOT NULL, `nom` varchar(500) NOT NULL, `image` varchar(1000) NOT NULL, `idQuestion` int(3) NOT NULL )', [])
            .then(() => {
                console.log('table propositionQuiz created!')
            });

        this.db.executeSql('CREATE TABLE IF NOT EXISTS `explication` ( `id` int(100) NOT NULL UNIQUE, `titre` varchar(500) NOT NULL, `image` varchar(500) NOT NULL, `texte` varchar(1000) NOT NULL, `titreBouton` varchar(500) NOT NULL, `texteBouton` varchar(500) NOT NULL, `idQuestion` int(3) NOT NULL, `idTheme` int(11) NOT NULL )', [])
            .then(() => {
                console.log('table explication created!')
            });

        this.db.executeSql('CREATE TABLE IF NOT EXISTS `defi` ( `id` int(11) NOT NULL UNIQUE, `idTheme` int(3) NOT NULL, `titre` varchar(500) NOT NULL, `etat` int(1) NOT NULL, `type` varchar(100) NOT NULL )', [])
            .then(() => {
                console.log('table defi created!')
            });

        this.db.executeSql('CREATE TABLE IF NOT EXISTS `reference` ( `reference` varchar(500) NOT NULL UNIQUE)', [])
            .then(() => {
                console.log('table defi created!')
            });


        /*insertion dans la table theme*/
        this.db.executeSql("INSERT INTO `theme` (`id`, `nom`, `progression`, `nbTicketActuel`, `nbTicketMax`) VALUES (100, 'La place des femmes dans linformatique', 0, 0, 0), (200, 'Le code / La programmation', 0, 0, 0)", [])
            .then(() => console.log('THEME insertion réussi!'))
            .catch(e => console.log(e));

        this.db.executeSql("INSERT INTO `defi` (`id`, `idTheme`, `titre`, `etat`, `type`) VALUES (101, 100, 'Technologie féminine', 0, 'quiz'), (102, 100, 'Send nudes', 0, 'action')", [])
            .then(() => console.log('DEFI insertion réussi!'))
            .catch(e => console.log(e));

        this.db.executeSql("INSERT INTO `question` (`id`, `intitule`, `textePresentation`, `idDefi`) VALUES (151, 'Laquelle de ces personnes est considérée comme la pionnière de la technologie Wifi ?', 'Texte de présentation au cas où', 101), (152, 'Qui a été la première personne à imaginer l’informatique ?', 'Imagination is key', 101)", [])
            .then(() => console.log('QUESTION insertion réussi!'))
            .catch(e => console.log(e));

        this.db.executeSql("INSERT INTO `propositionQuiz` (`id`, `isReponse`, `nom`, `image`, `idQuestion`) VALUES (1511, 1, 'Hedy Lamarr', '--', 151), (1512, 0, 'Sean Connery', '', 151), (1513, 0, 'Steve Jobs', '', 151), (1514, 0, 'Micheal Jordan', '', 151), (1521, 1, 'Ada Lovelace', '', 152), (1522, 0, 'Bill Gates', '', 152), (1523, 0, 'Christophe Buyse', '', 152), (1524, 0, 'Youssef Serrestou', '', 152)", [])
            .then(() => console.log('QUIZ insertion réussi!'))
            .catch(e => console.log(e));

        this.db.executeSql("INSERT INTO `explication` (`id`, `titre`, `image`, `texte`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES (111, 'Hedy Lamarr créatice de la wifi', 'image', 'Cette femme est responsable de la création de l''informatique', 'bouton', 'en savoir plus', 101, 0), (112, 'Ada Lovelace a imaginé l''informatique', 'image', 'Une femmea imaginer l''informatique', 'bouton', 'En savoir plus', 102, 0), (199, 'Les femmes sont informaticiennes', 'image', 'Nous pouvons voir que les femmes sont informaticiennes', 'bouton', 'En savoir plus', 0, 100)", [])
            .then(() => console.log('EXPLICATION insertion réussi!'))
            .catch(e => console.log(e));




    }

    //Pour modifier le contenu de la base de données
    /*setData(trucAchanger: string, endroitOuChanger: string, table: string) {

        let requete: string = "update `" + table + "` set ...=\"" + trucAchanger + "\" where ...=\"" + endroitOuChanger + "\"";
        this.db.executeSql(requete, [])
            .then(() => console.log('mise a jour toto effectuée !'))
            .catch(e => console.log(e));
    }*/

    //Pour lire des données de la base
    selectData(fin: any, table: string, attribut: string): Promise<Array<any>> {

        let res: Array<any> = [];
        let requete: string = "select " + attribut + " from `" + table + "`" + fin;
        console.log("Requête : ", requete);

        return new Promise((resolve) => {
            this.db.executeSql(requete, [])
                .then(data => {
                    if (data.rows) {
                        if (data.rows.length > 0) {
                            for (var i = 0; i < data.rows.length; i++) {
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
        });
    }

    
    setReference(ref: any){
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