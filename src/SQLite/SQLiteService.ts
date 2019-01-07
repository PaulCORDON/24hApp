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


    createTables(): void {

        /*creation de la table toto*/
        this.db.executeSql('CREATE TABLE `toto` ( `...` INTEGER NOT NULL, `...` INTEGER NOT NULL, ... )', [])
            .then(() => {
                console.log('table toto created!')
            })

        /*insertion dans la table toto*/
        this.db.executeSql('insert into `toto` (..., ...,...) values (500,1,...) ', [])
            .then(() => console.log('insertion réussi! 8==3'))
            .catch(e => console.log(e));
    }


    //Pour modifier le contenu de la base de données
    setTruc(trucAchanger: string, endroitOuChanger: string) {

        let requete: string = "update `toto` set ...=\"" + trucAchanger + "\" where ...=\"" + endroitOuChanger + "\"";
        this.db.executeSql(requete, [])
            .then(() => console.log('mise a jour toto effectuée !'))
            .catch(e => console.log(e));
    }

    //Pour lire des données de la base
    selectMachin(idNiveau: number): Promise<number[]> {

        let res: number[] = [];
        let requete: string = "select * from `toto` where ...=\"" + idNiveau + "\"";
        return new Promise((resolve) => {
            this.db.executeSql(requete, [])
                .then(data => {
                    if (data.rows) {
                        if (data.rows.length > 0) {
                            for (var i = 0; i < data.rows.length; i++) {
                                res.push(data.rows.item(i).index);

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
}