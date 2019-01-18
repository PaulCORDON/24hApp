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
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `explication` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `texte` varchar(500) NOT NULL UNIQUE, `image` varchar(500) NOT NULL, `titre` varchar(1000) NOT NULL, `titreBouton` varchar(500) NOT NULL, `texteBouton` varchar(500) NOT NULL, `idQuestion` int(3) NOT NULL, `idTheme` int(11) NOT NULL )', []).catch(e => console.log(e));
        this.db.executeSql('CREATE TABLE IF NOT EXISTS `defi` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `idTheme` int(3) NOT NULL, `titre` varchar(500) NOT NULL UNIQUE, `etat` int(1) NOT NULL, `type` varchar(100) NOT NULL )', []).catch(e => console.log(e));
        this.insertInTable();
    }

    insertInTable() {
        this.db.executeSql("INSERT INTO `theme` (`nom`, `progression`, `nbTicketActuel`, `nbTicketMax`) VALUES ('Les femmes et l''informatique', 0, 0, 1), ('Le code / La programmation', 0, 0, 2), ('Trouvez des geeks', 0, 0, 1), ('Culture informatique', 0, 0, 1)", [])
            .catch(e => console.log(e));
        this.insertDefi();
    }

    insertDefi() {
        this.selectData("", "theme", "*").then((getIDTheme) => {
            let i = 0;

            //Défis du thème 1
            this.db.executeSql("INSERT INTO `defi` (`idTheme`, `titre`, `etat`, `type`) VALUES (" + getIDTheme[i++].id + ", 'Technologie féminine', 1, 'quiz')", [])
                .catch(e => console.log(e + " " + i));
            /*this.db.executeSql("INSERT INTO `defi` (`idTheme`, `titre`, `etat`, `type`) VALUES (" + getIDTheme[i++].id + ", 'Send nudes', 0, 'action')", [])
                .catch(e => console.log(e + " " + i));*/

            //Défis du thème 2
            this.db.executeSql("INSERT INTO `defi` (`idTheme`, `titre`, `etat`, `type`) VALUES (" + getIDTheme[i].id + ", 'Le codage pour les nuls', 0, 'quiz'),  (" + getIDTheme[i++].id + ", 'L''algorithmique pour les nuls', 0, 'quiz')", [])
                .catch(e => console.log(e + " " + i));
            /*this.db.executeSql("INSERT INTO `defi` (`idTheme`, `titre`, `etat`, `type`) VALUES (" + getIDTheme[i++].id + ", 'Programmez un programme', 0, 'action')", [])
                .catch(e => console.log(e + " " + i));*/

            //Défis du thème 3
            this.db.executeSql("INSERT INTO `defi` (`idTheme`, `titre`, `etat`, `type`) VALUES (" + getIDTheme[i++].id + ", 'Préjugés', 0, 'quiz')", [])
                .catch(e => console.log(e + " " + i));
            /*this.db.executeSql("INSERT INTO `defi` (`idTheme`, `titre`, `etat`, `type`) VALUES (" + getIDTheme[i++].id + ", 'Percez un bouton', 0, 'action')", [])
                .catch(e => console.log(e + " " + i));*/

            //Défis du thème 4
            this.db.executeSql("INSERT INTO `defi` (`idTheme`, `titre`, `etat`, `type`) VALUES (" + getIDTheme[i].id + ", 'L''informatique pour les nuls', 0, 'quiz')", [])
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
            this.db.executeSql("INSERT INTO `question` (`intitule`, `textePresentation`, `idDefi`) VALUES ('Laquelle de ces personnes est considérée comme la pionnière de la technologie Wifi ?', '', " + getIDDefi[i].id + "), ('Quelle a été la première personne à imaginer que l''on pourrait programmer les ordinateurs avec un langage ?', '', " + getIDDefi[i].id + "), ('Qui a conçu le premier ordinateur au monde ?', '', " + getIDDefi[i].id + "), ('Le cobol est un langage de programmation créé en 1959. Il est encore utilisé aujourdhui, surtout dans le domaine des banques. Qui est l''inventeur de ce langage de programmation ?', '', " + getIDDefi[i].id + "), ('Qui a conçu les logiciels de guidage du vaisseau de la mission lunaire Apollo ?', '', " + getIDDefi[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));

            //Défi Prendre en photo une informaticienne
            /*this.db.executeSql("INSERT INTO `question` (`intitule`, `textePresentation`, `idDefi`) VALUES ('Votre mission est de scanner le QR Code de 3 informaticiennes. GO!', '', " + getIDDefi[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));*/

            //Défi le codage pour les nuls
            this.db.executeSql("INSERT INTO `question` (`intitule`, `textePresentation`, `idDefi`) VALUES ('Quel est l''intrus ?', '', " + getIDDefi[i].id + "), ('Quel langage de programmation a été inventé le premier?', '', " + getIDDefi[i].id + "), ('Trouvez un intru parmi ces conditions algorithmiques :', '', " + getIDDefi[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            //Défi l'algorithme pour les nuls
            this.db.executeSql("INSERT INTO `question` (`intitule`, `textePresentation`, `idDefi`) VALUES ('Que fait ce programme ?', 'question1', " + getIDDefi[i].id + "), ('Que va écrire le programme ?', 'question2', " + getIDDefi[i].id + "), ('Combien de cafés aura bu Bob à la fin du programme ?', 'question3', " + getIDDefi[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            //Défi Préjugés
            this.db.executeSql("INSERT INTO `question` (`intitule`, `textePresentation`, `idDefi`) VALUES ('Un informaticien est souvent :', '', " + getIDDefi[i].id + "), ('Un informaticien travaille le plus souvent :', '', " + getIDDefi[i].id + "), ('Un informaticien peut :', '', " + getIDDefi[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            //Defi Les chiffres en info
            this.db.executeSql("INSERT INTO `question` (`intitule`, `textePresentation`, `idDefi`) VALUES ('À votre avis, combien faudrait il de temps à un ordinateur pour hacker le mot de passe 12345 ?', '', " + getIDDefi[i].id + "), ('Quelle quantité de données est produite par l''humanité chaque seconde ?', '', " + getIDDefi[i].id + "), ('À votre avis, combien d''emplois en informatique étaient vacants à la fin de l''année 2018 en France?', '', " + getIDDefi[i].id + "), ('L''ordinateur le plus puissant au monde (conçu par IBM) peut effectuer 200 millions de milliards de calculs par seconde. Quel est son prix ?', '', " + getIDDefi[i++].id + ")", [])
                .catch(e => console.log(e));

            /*this.db.executeSql("INSERT INTO `question` (`intitule`, `textePresentation`, `idDefi`) VALUES", [])
                .catch(e => console.log(e + " " + i));*/
            this.insertReponse();
        });
    }

    insertReponse() {
        this.selectData("", "question", "*").then((getIDQuestion) => {
            let i = 0;
            //Réponses Thème 1 - Quiz 1
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (1, 'Hedy Lamarr', '', " + getIDQuestion[i].id + "), (0, 'Sean Connery', '', " + getIDQuestion[i].id + "), (0, 'Steve Jobs', '', " + getIDQuestion[i].id + "), (0, 'Michael Jordan', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, 'MiCode', '', " + getIDQuestion[i].id + "), (0, 'Bill Gates', '', " + getIDQuestion[i].id + "), (1, 'Ada Lovelace', '', " + getIDQuestion[i].id + "), (0, 'René Descartes', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, 'Larry Tesler', '', " + getIDQuestion[i].id + "), (1, 'Jean Bartik', '', " + getIDQuestion[i].id + "), (0, 'Douglas Engelbart', '', " + getIDQuestion[i].id + "), (0, 'James Gosling', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (1, 'Grace Hopper', '', " + getIDQuestion[i].id + "), (0, 'Stephen Hawking', '', " + getIDQuestion[i].id + "), (0, 'Mark Zuckerberg', '', " + getIDQuestion[i].id + "), (0, 'Markus Persson', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, 'David Clark', '', " + getIDQuestion[i].id + "), (0, 'Tim Paterson', '', " + getIDQuestion[i].id + "), (1, 'Margaret Hamilton', '', " + getIDQuestion[i].id + "), (0, 'Pierre Curie', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));

            // Réponses Thème 2 - Quiz 2
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, 'C', '', " + getIDQuestion[i].id + "), (1, 'C4', '', " + getIDQuestion[i].id + "), (0, 'C#', '', " + getIDQuestion[i].id + "), (0, 'C++', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, 'Swift', '', " + getIDQuestion[i].id + "), (1, 'A0-System', '', " + getIDQuestion[i].id + "), (0, 'HTML', '', " + getIDQuestion[i].id + "), (0, 'Python', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, 'selon les cas', '', " + getIDQuestion[i].id + "), (0, 'si... alors...', '', " + getIDQuestion[i].id + "), (0, 'tant que... alors...', '', " + getIDQuestion[i].id + "), (1, 'pourquoi pas', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));

            // Réponses Thème 2 - Quiz 3
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, 'Il ne fait rien de spécial', '', " + getIDQuestion[i].id + "), (1, 'Il échange les valeurs de a et b', '', " + getIDQuestion[i].id + "), (0, 'Il échange les valeurs de a et c', '', " + getIDQuestion[i].id + "), (0, 'Il échange les valeurs de b et c', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (1, 'ce nombre est positif', '', " + getIDQuestion[i].id + "), (0, 'ce nombre est négatif', '', " + getIDQuestion[i].id + "), (0, 'ce nombre est égal à 0', '', " + getIDQuestion[i].id + "), (0, 'ce n''est pas un nombre', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, '0', '', " + getIDQuestion[i].id + "), (0, '4', '', " + getIDQuestion[i].id + "), (1, '6', '', " + getIDQuestion[i].id + "), (0, '7', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));

            //Réponses Thème 3 - Quiz 4
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, 'Petit', '', " + getIDQuestion[i].id + "), (0, 'Asocial', '', " + getIDQuestion[i].id + "), (0, 'Avec des lunettes', '', " + getIDQuestion[i].id + "), (1, 'Normal', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, 'Seul', '', " + getIDQuestion[i].id + "), (1, 'En équipe', '', " + getIDQuestion[i].id + "), (0, 'A deux', '', " + getIDQuestion[i].id + "), (0, 'Il ne travaille pas', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (1, 'Vous envoyer dans la matrice', '', " + getIDQuestion[i].id + "), (0, 'Hacker un site en quelques minutes', '', " + getIDQuestion[i].id + "), (0, 'Réparer une imprimante défaillante', '', " + getIDQuestion[i].id + "), (1, 'Cela dépend de son domaine de compétence', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));

            //Réponses Thème 4 - Quiz 5
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, '1 jour', '', " + getIDQuestion[i].id + "), (0, '1 heure', '', " + getIDQuestion[i].id + "), (0, '1 seconde', '', " + getIDQuestion[i].id + "), (1, '1 nano-seconde', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, '20 000 GB', '', " + getIDQuestion[i].id + "), (0, '200 000 GB', '', " + getIDQuestion[i].id + "), (1, '2 000 000 GB', '', " + getIDQuestion[i].id + "), (0, '20 000 000 GB', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, '1', '', " + getIDQuestion[i].id + "), (0, '1 000', '', " + getIDQuestion[i].id + "), (0, '7 000', '', " + getIDQuestion[i].id + "), (1, '13 000', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES (0, '24 000 000€', '', " + getIDQuestion[i].id + "), (1, '240 000 000€', '', " + getIDQuestion[i].id + "), (0, '2 400 000 000€', '', " + getIDQuestion[i].id + "), (0, '24 000 000 000€', '', " + getIDQuestion[i++].id + ")", [])
                .catch(e => console.log(e + " " + i));
            /*this.db.executeSql("INSERT INTO `reponse` (`isReponse`, `nom`, `image`, `idQuestion`) VALUES", [])
                .catch(e => console.log(e + " " + i));*/
            this.insertExplication();
        });
    }

    insertExplication() {
        this.selectData("", "question", "*").then((getIDQuestion) => {

            this.selectData("", "theme", "*").then((getIDTheme) => {
                let question = 0;
                let theme = 0;

                //Explication des questions du quiz 1
                this.db.executeSql("INSERT INTO `explication` (`texte`, `image`, `titre`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('Hedy Lamarr est surtout connue pour sa carrière à Hollywood, mais l''actrice était aussi une inventrice de talent dont les idées sont encore utilisées aujourdhui. En 1941, Hedy Lamarr propose un système secret de communication. Utilisable sur les torpilles radio-guidées, il permet au système de radio-transmission de changer régulièrement de fréquence, rendant presque impossible la détection de la torpille. Ce principe est toujours utilisé dans les technologies daujourdhui comme le positionnement par satellites avec les GPS, les liaisons chiffrées militaires, dans la technique du WIFI ou avec les smartphones.', 'hedy.jpg', 'Hedy Lamar - Créatrice de la wifi', 'https://fr.wikipedia.org/wiki/Hedy_Lamarr', 'en savoir plus', " + getIDQuestion[question++].id + ", 0)", [])
                    .catch(e => console.log(e));
                this.db.executeSql("INSERT INTO `explication` (`texte`, `image`, `titre`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('Ada Lovelace est principalement connue pour avoir réalisé le premier programme informatique, lors de son travail sur un ancêtre de l''ordinateur : la machine analytique de Charles Babbage. Dans ses notes, on trouve en effet le premier programme destiné à être exécuté par une machine, ce qui fait d''Ada Lovelace la première programmeuse du monde.', 'ada.jpg', 'Ada Lovelace - Première programmeuse', 'bouton', 'En savoir plus', " + getIDQuestion[question++].id + ", 0)", [])
                    .catch(e => console.log(e));
                this.db.executeSql("INSERT INTO `explication` (`texte`, `image`, `titre`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('En 1943, en pleine guerre du Pacifique, l''armée américaine lance la conception d un superordinateur qui sera le tout premier ordinateur électronique au monde. Le projet recrute six femmes, rapidement surnommées les ENIAC Girls, pour programmer le logiciel de l''ordinateur. Diplômée en mathématiques, Jean Bartik est l''une d entre elles. La jeune femme et son équipe apprennent rapidement à programmer en partant de zéro, sans langage ni outils de programmation préalables. Elles se distinguent en résolvant des problèmes complexes et en suggérant des améliorations matérielles.\nLarry Tesler est l''inventeur du copier/coller, Douglas Engelbart de la souris d''ordinateur et James Gosling du langage Java.', 'jean.jpg', 'Jean Bartik - Première conceptrice d''un super-ordinateur', 'bouton', 'En savoir plus', " + getIDQuestion[question++].id + ", 0)", [])
                    .catch(e => console.log(e));
                this.db.executeSql("INSERT INTO `explication` (`texte`, `image`, `titre`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('Grace Hopper cherche à améliorer la manière dont on donne des instructions aux ordinateurs. À l''époque, entrer des lignes de commande nécessite d''aligner les chiffres, technique complexe et peu intuitive. Elle souhaite que l''on puisse entrer des commandes directement en anglais, comme l''on s''adresse à un être humain. Elle atteint son objectif en créant pour l''UNIVAC le langage FLOW-MATIC. En 1959, elle retravaille FLOW-MATIC pour créer COBOL, plus généraliste. Celui-ci devient le langage de programmation standard pour les militaires et entreprises américaines. Il demeure encore employé aujourd''hui.\nStephen Hawking est un grand physicien et théoricien britannique, Mark Zuckerberg est le créateur de Facebook et Markus Persson (alias Notch) est le créateur du jeu Minecraft.', 'grace.jpg', 'Grace Hopper - Créatice du COBOL', 'bouton', 'En savoir plus', " + getIDQuestion[question++].id + ", 0)", [])
                    .catch(e => console.log(e));
                this.db.executeSql("INSERT INTO `explication` (`texte`, `image`, `titre`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('Margaret Hamilton, née Heafield le 17 août 1936, est une informaticienne, ingénieure système et chef d''entreprise américaine. Elle était directrice du département génie logiciel au sein du MIT Instrumentation Laboratory qui conçut le système embarqué du programme spatial Apollo.\n Tim Paterson a travaillé avec Bill Gates à Microsoft au début des années 80, David Clark est le PDG d une entreprise de casque audio et Pierre Curie est physicien, mari de Marie Curie.', 'margaret.jpg', 'Margaret Hamilton - Créatrice du système embarqué des missions Apollo', 'bouton', 'En savoir plus', " + getIDQuestion[question++].id + ", 0)", [])
                    .catch(e => console.log(e));

                //Explication des questions du quiz 2
                this.db.executeSql("INSERT INTO `explication` (`texte`, `image`, `titre`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('Le C# est un langage de programmation orienté objet, commercialisé par Microsoft depuis 2002 et destiné à développer sur la plateforme Microsoft .NET. \nLe C++ est un langage de programmation compilé permettant la programmation sous de multiples paradigmes (comme la programmation procédurale, orientée objet ou générique). Ses bonnes performances, et sa compatibilité avec le C en font un des langages de programmation les plus utilisés dans les applications où la performance est critique.\nLe C est un langage de programmation impératif généraliste. Inventé au début des années 1970 pour réécrire UNIX, C est devenu un des langages les plus utilisés. De nombreux langages plus modernes comme C++, C#, Java et PHP ont une syntaxe similaire au C et reprennent en partie sa logique.\n\n', 'c4.jpg', 'Le C4, c''est de la bombe', 'bouton', 'En savoir plus', " + getIDQuestion[question++].id + ", 0)", [])
                    .catch(e => console.log(e));
                this.db.executeSql("INSERT INTO `explication` (`texte`, `image`, `titre`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('A-0 System est le premier compilateur développé pour un ordinateur. Il a été écrit par Grace Hopper en 1951.\nIl permettait de décrire un programme comme une séquence de sous-programmes ayant des paramètres. Les sous-programmes étaient identifiés par un code numérique et leurs paramètres étaient écrits directement après le code de chaque sous-programme.', 'a0.jpg', 'A0-System à l''origine de la programmation', 'bouton', 'En savoir plus', " + getIDQuestion[question++].id + ", 0)", [])
                    .catch(e => console.log(e));
                this.db.executeSql("INSERT INTO `explication` (`texte`, `image`, `titre`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('POURQUOI PAS nexiste pas dans le jargon informatique.\nSI, TANT QUE et SWITCH sont des conditions qui permettent aux programmes dexécuter des tâches en fonction de certains paramètres.\nExemple : SI le temps est nuageux, alors jemmène un parapluie. TANT QUE le temps est nuageux, je garde mon parapluie avec moi.\nCet exemple peut être traduit sur des fonctions informatiques.', 'algo.jpg', 'Et pourquoi pas ?', 'bouton', 'En savoir plus', " + getIDQuestion[question++].id + ", 0)", [])
                    .catch(e => console.log(e));

                //Explication des questions du quiz 3
                this.db.executeSql("INSERT INTO `explication` (`texte`, `image`, `titre`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('Il échange les valeurs de a et b.\nCe programme est un programme simple pour échanger la valeur de deux variables. On remarque que l''échange nécessite une troisième variable de stockage, qui permet au programme de garder en mémoire la valeur d’une des deux variables échangées.', 'algoNulsQ1.png', 'Echange de valeurs', 'bouton', 'En savoir plus', " + getIDQuestion[question++].id + ", 0)", [])
                    .catch(e => console.log(e));
                this.db.executeSql("INSERT INTO `explication` (`texte`, `image`, `titre`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('Le programme va écrire : ce nombre est positif.\nEn effet, ce code contient une erreur, “positif” et “négatif” sont inversés. Un programme informatique n''est pas infaillible et surtout un codeur fait souvent des erreurs d''inattention. L''ordinateur ne peut pas reconnaître ces erreurs. C''est pour ça que c''est important de bien lire un code et de le tester fréquemment.', 'algoNulsQ2.png', 'Prends garde aux erreurs', 'bouton', 'En savoir plus', " + getIDQuestion[question++].id + ", 0)", [])
                    .catch(e => console.log(e));
                this.db.executeSql("INSERT INTO `explication` (`texte`, `image`, `titre`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('L''informaticien aura bu 6 cafés.\nEffectivement on remarque que le programme fait boire un café à l''informaticien toutes les 4 heures. Si l''on divise donc 24 par 4 on trouve 6 cafés.', 'algoNulsQ3.png', 'Le café', 'bouton', 'En savoir plus', " + getIDQuestion[question++].id + ", 0)", [])
                    .catch(e => console.log(e));

                //Explication des questions du quiz 4  
                this.db.executeSql("INSERT INTO `explication` (`texte`, `image`, `titre`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('Un informaticien est une personne normale. Nous pouvons voir dans certaines séries ou certains films des stéréotypes d''informaticiens tels que les lunettes rondes, des boutons, un gamer hardcore, des cheveux longs, des personnes asociables.\nVenez nous rencontrer, nous casserons tous vos préjugés.', 'incroyable.jpg', 'Des êtres incroyables', 'bouton', 'En savoir plus', " + getIDQuestion[question++].id + ", 0)", [])
                    .catch(e => console.log(e));
                this.db.executeSql("INSERT INTO `explication` (`texte`, `image`, `titre`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('Le travail d''informaticien est avant tout un travail d''équipe. Pour développer une application quelconque, il faut plusieurs compétences qui sont toutes complémentaires et qu''on retrouve chez chaque informaticien spécialisé : un lead programmer, un designer UX, un Data Analyst, un graphiste, ect', 'equipe.jpg', 'Un esprit d''équipe redoutable', 'bouton', 'En savoir plus', " + getIDQuestion[question++].id + ", 0)", [])
                    .catch(e => console.log(e));
                this.db.executeSql("INSERT INTO `explication` (`texte`, `image`, `titre`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('Comme vu lors de la question précédente, il existe toute sorte de spécilité dans le métier d''informaticien. Il peut également être polyvalent et peut réaliser plusieurs missions dans le cadre du développement d''une application, comme par exemple coder et faire le graphisme.', 'multi.jpg', 'Un individu pluri-disciplinaire', 'bouton', 'En savoir plus', " + getIDQuestion[question++].id + ", 0)", [])
                    .catch(e => console.log(e));

                //Explication des questions du quiz 5
                this.db.executeSql("INSERT INTO `explication` (`texte`, `image`, `titre`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('Et oui ! Avec les technologies d''aujourd''hui, il est très facile de pirater un mot de passe du type 12345. Les systèmes dexploitation tels que Kali Linux disposent doutils pour pouvoir hacker un mot de passe de nombreuses façons. Jetez-y un coup d''oeil, mais, pas de bêtises ;)', 'mister.jpg', 'Mister Robot dans la vraie vie', 'bouton', 'En savoir plus', " + getIDQuestion[question++].id + ", 0)", [])
                    .catch(e => console.log(e));
                this.db.executeSql("INSERT INTO `explication` (`texte`, `image`, `titre`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('Ce nombre gigantesque s''explique facilement. Chaque secondes, des milions d''internautes mettent en ligne sur les réseaux sociaux des photos, vidéos, documents, etc.', 'poids.jpg', 'L''informatique pèse de plus en plus', 'bouton', 'En savoir plus', " + getIDQuestion[question++].id + ", 0)", [])
                    .catch(e => console.log(e));
                this.db.executeSql("INSERT INTO `explication` (`texte`, `image`, `titre`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('Le marché du travail est très ouvert pour les informaticiens. Le monde numérique évolue toujours plus et il y a beaucoup plus d''offres que de demandes.', 'metier.jpg', 'Un métier avec un avenir', 'bouton', 'En savoir plus', " + getIDQuestion[question++].id + ", 0)", [])
                    .catch(e => console.log(e));
                this.db.executeSql("INSERT INTO `explication` (`texte`, `image`, `titre`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ('240 000 000€ !\nC''est le prix de l''ordinateur le plus cher du monde, disponible pour les entreprises et les professionelles. Ce type d''ordinateur permet généralement de faire des milliards de milliard de calculs par secondes. Avec cet ordinateur, les USA prennent la première place de l''ordinateur le plus puissant (et fatalement le plus cher) du monde, première place occupée auparavant par la Chine.', 'puissant.jpg', 'Des équipements chers', 'bouton', 'En savoir plus', " + getIDQuestion[question++].id + ", 0)", [])
                    .catch(e => console.log(e));


                /*this.db.executeSql("INSERT INTO `explication` (`texte`, `image`, `titre`, `titreBouton`, `texteBouton`, `idQuestion`, `idTheme`) VALUES ", [])
                    .catch(e => console.log(e + " " + i));*/
            });
        })
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
                                //console.log("SQLSERVICE --------- " + i, data.rows.item(i));
                            }
                        }
                    }
                    //console.log("selectData res : " + JSON.stringify(res))
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