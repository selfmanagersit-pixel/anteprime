window.P2M={
wa:'390804829161',
hours:{open:540,close:1440,kitchen:1020},
voice:[
{t:0,it:"Il porto dorme.",en:"The harbour sleeps.",sit:"Le barche sono ormeggiate. Sul molo resta accesa solo la luce del fanale.",sen:"The boats are moored. Only the harbour light stays on."},
{t:240,it:"Le barche escono, al buio.",en:"The boats head out, in the dark.",sit:"Si esce prima che il cielo cambi colore.",sen:"They leave before the sky changes colour."},
{t:'rise-40',it:"Il sole sorge dal mare.",en:"The sun rises from the sea.",sit:"Savelletri guarda a est: qui il giorno comincia sull'acqua.",sen:"Savelletri faces east: here the day begins on the water."},
{t:'rise+50',it:"Le barche rientrano nel porticciolo.",en:"The boats come back into the harbour.",sit:"Quello che il mare ha dato arriva a terra, a pochi passi dal banco.",sen:"What the sea gave comes ashore, a few steps from the counter."},
{t:540,it:"La pescheria è aperta.",en:"The fish market is open.",sit:"Il pesce sta sul ghiaccio, ognuno con il suo cartellino.",sen:"The fish lies on ice, each with its own label."},
{t:750,it:"Si pranza sul porto.",en:"Lunch on the harbour.",sit:"Al bancone sugli sgabelli, o fuori tra le palme.",sen:"At the counter on a stool, or outside among the palms."},
{t:930,it:"Il banco si svuota.",en:"The counter empties.",sit:"Quello che resta sul ghiaccio sta per cambiare forma.",sen:"What is left on the ice is about to change shape."},
{t:1020,it:"La cucina si accende.",en:"The kitchen comes alive.",sit:"Lo stesso pesce del mattino diventa crudo, tartare, carpaccio.",sen:"The same fish from the morning becomes crudo, tartare, carpaccio."},
{t:'set-25',it:"Si accendono le luci della vetrata.",en:"The glass pavilion lights up.",sit:"Il sole scende dietro il paese e il mare si tinge di rosa.",sen:"The sun goes down behind the town and the sea turns pink."},
{t:1230,it:"La sera, a tavola.",en:"Evening, at the table.",sit:"Un calice di bianco ben freddo, davanti al porticciolo.",sen:"A glass of properly cold white wine, facing the harbour."},
{t:1380,it:"L'ultimo calice, sul mare.",en:"The last glass, by the sea.",sit:"La piazza si svuota. Domani si ricomincia dal mare.",sen:"The square empties. Tomorrow it starts again from the sea."}
],
tags:[
{id:'pescheria',x:110,y:600,from:0,to:1440,it:'La pescheria',en:'The fish market'},
{id:'banco',x:330,y:670,from:390,to:1020,it:'Il banco',en:'The counter'},
{id:'cucina',x:520,y:618,from:840,to:1200,it:'La cucina',en:'The kitchen'},
{id:'carta',x:300,y:712,from:1020,to:1500,it:'La carta del crudo',en:'The raw bar menu'},
{id:'vini',x:590,y:722,from:1080,to:1500,it:'I vini',en:'The wines'},
{id:'vetrata',x:735,y:582,from:1020,to:1500,it:'La vetrata',en:'The pavilion'},
{id:'tavolo',x:960,y:766,from:0,to:1440,it:'Il tuo tavolo',en:'Your table'}
],
sheets:{
pescheria:{k:{it:'Piazza Amati 1 · Savelletri',en:'Piazza Amati 1 · Savelletri'},h:{it:'Due sorelle, due mari.',en:'Two sisters, two seas.'},p:{it:"2 Mari è una pescheria con crudoteca sul porticciolo di Savelletri, accanto alla chiesa. La gestiscono due sorelle.",en:"2 Mari is a fish market and raw bar on the small harbour of Savelletri, next to the church. It is run by two sisters."},b:[
{t:'g',i:[['01',{it:'La pescheria sulla piazza, accanto alla chiesa',en:'The fish market on the square, by the church'}],['45',{it:'Il porticciolo',en:'The harbour'}],['34',{it:'Le barche ormeggiate',en:'Moored boats'}],['56',{it:'L\'ingresso',en:'The entrance'}],['04',{it:'Il lungomare',en:'The seafront'}]]},
{t:'two',r:[[{it:'Di giorno',en:'By day'},{it:'Il banco',en:'The counter'},{it:"Pesce, molluschi e crostacei sul ghiaccio, ognuno con il suo cartellino. Si sceglie e si porta a casa, pulito e pronto da cucinare.",en:"Fish, molluscs and shellfish on ice, each with its label. You choose and take it home, cleaned and ready to cook."}],[{it:'La sera',en:'In the evening'},{it:'La crudoteca',en:'The raw bar'},{it:"Lo stesso pescato diventa crudo, tartare, carpaccio. Si mangia sotto la vetrata o fuori, tra le palme.",en:"The same catch becomes crudo, tartare, carpaccio. You eat under the glass or outside among the palms."}]]},
{t:'q',x:{it:"La Puglia ha due mari. Il locale ha due anime.",en:"Apulia has two seas. The place has two souls."}},
{t:'info',r:[[{it:'Indirizzo',en:'Address'},'Piazza Amati 1 · 72015 Savelletri di Fasano (BR)'],[{it:'Orari',en:'Hours'},{it:'Tutti i giorni 09:00–24:00 · indicativi',en:'Every day 09:00–24:00 · indicative'}],[{it:'Telefono',en:'Phone'},'<a href="tel:+390804829161">+39 080 482 9161</a>'],['Instagram','<a href="https://www.instagram.com/pescheria2mari/" target="_blank" rel="noopener">@pescheria2mari</a>'],[{it:'Dintorni',en:'Nearby'},{it:'Fasano e Monopoli in auto · Parco archeologico di Egnazia a pochi minuti',en:'Fasano and Monopoli by car · Egnazia archaeological park a few minutes away'}]]},
{t:'map'}]},
banco:{k:{it:'Dal mattino · 09:00–17:00',en:'From the morning · 9am–5pm'},h:{it:'Il banco, ogni giorno diverso.',en:'The counter, different every day.'},p:{it:"Pesce azzurro e pesce bianco, molluschi, crostacei, frutti di mare. Quello che c'è dipende dal mare e dalla stagione: ogni pezzo ha il suo cartellino.",en:"Oily fish and white fish, molluscs, crustaceans, shellfish. What's there depends on the sea and the season: every piece has its label."},b:[
{t:'g',i:[['64',{it:'Il banco del pesce',en:'The fish counter'}],['14',{it:'Ostriche sul ghiaccio',en:'Oysters on ice'}],['07',{it:'Gamberi rossi',en:'Red prawns'}]]},
{t:'sp'},
{t:'h',k:{it:'Come si legge',en:'How to read it'},h:{it:'Il cartellino.',en:'The label.'}},
{t:'p',x:{it:"Per legge ogni prodotto ittico riporta nome commerciale, nome scientifico, zona di cattura e metodo di produzione. Chiedete: vi diciamo da dove arriva e come cucinarlo.",en:"By law every seafood product shows its trade name, Latin name, catch area and production method. Ask us: we'll tell you where it comes from and how to cook it."}},
{t:'label'},
{t:'list',r:[[{it:'Pulizia',en:'Cleaning'},{it:'Squamato, eviscerato, sfilettato su richiesta',en:'Scaled, gutted, filleted on request'}],[{it:'Da asporto',en:'Take-away'},{it:'Pronto da cucinare, o crudo già preparato',en:'Ready to cook, or crudo already prepared'}],[{it:'Consiglio',en:'Advice'},{it:'Per ogni pesce, la cottura giusta',en:'For each fish, the right way to cook it'}]]}]},
cucina:{k:{it:'Dalle 17:00',en:'From 5pm'},h:{it:'Dal banco alla cucina.',en:'From the market to the kitchen.'},p:{it:"Nel pomeriggio il banco si svuota e la cucina si accende. Lo stesso pesce che al mattino stava sul ghiaccio cambia forma.",en:"In the afternoon the counter empties and the kitchen comes alive. The same fish that lay on ice in the morning changes shape."},b:[
{t:'pairs'},
{t:'h',k:{it:'Dalla cucina',en:'From the kitchen'},h:{it:'Crudo, ma non solo.',en:'Raw, and more.'}},
{t:'g',i:[['55',{it:'Tris di tartare',en:'Trio of tartare'}],['49',{it:'Carpaccio',en:'Carpaccio'}],['53',{it:'Crudi in barattolo',en:'Raw fish in jars'}],['16',{it:'I barattoli del giorno',en:'Jars of the day'}],['37',{it:'Primo di mare',en:'Seafood pasta'}],['59',{it:'Frittura di mare',en:'Fried seafood'}],['50',{it:'Insalata di mare',en:'Seafood salad'}]]},
{t:'list',r:[[{it:'Crudi',en:'Raw'},{it:'Ostriche, gamberi, scampi, tartare e carpacci',en:'Oysters, prawns, langoustines, tartare and carpaccio'}],[{it:'Cotti',en:'Cooked'},{it:'Primi di mare, fritture, tonno scottato',en:'Seafood pasta, fried fish, seared tuna'}],[{it:'Al bancone',en:'At the counter'},{it:'Un assaggio veloce, anche a pranzo',en:'A quick taste, lunch included'}]]}]},
carta:{k:{it:'Menù d\'esempio · prezzi indicativi',en:'Sample menu · indicative prices'},h:{it:'La carta del crudo.',en:'The raw bar menu.'},p:{it:"Il pescato cambia ogni giorno: la carta segue il banco.",en:"The catch changes every day: the menu follows the counter."},b:[{t:'menu'},{t:'p',x:{it:"Carta d'esempio per questa anteprima: piatti e prezzi reali si confermano con il locale.",en:"Sample menu for this preview: actual dishes and prices to be confirmed with the restaurant."},c:'note'}]},
vini:{k:{it:'Al calice e in bottiglia',en:'By the glass and bottle'},h:{it:'Vini, ben freddi.',en:'Wines, properly cold.'},p:{it:"Una carta ampia, con bollicine e champagne, e il vino al calice servito ben freddo, come si beve sul mare.",en:"A wide list, with sparkling wines and champagne, and wine by the glass served properly cold, the way you drink it by the sea."},b:[
{t:'g',i:[['67',{it:'Un calice sul mare',en:'A glass by the sea'}],['44',{it:'La cantina a vista',en:'The wine cabinet'}],['47',{it:'Bianco e crudo',en:'White wine and crudo'}]]},
{t:'list',r:[[{it:'Bollicine',en:'Sparkling'},{it:'Metodo classico e champagne, per le ostriche',en:'Traditional method and champagne, for oysters'}],[{it:'Bianchi',en:'Whites'},{it:'Freschi e sapidi, per crudi e carpacci',en:'Fresh and savoury, for crudo and carpaccio'}],[{it:'Rosati',en:'Rosés'},{it:'Pugliesi, per il tonno e i cotti',en:'From Apulia, for tuna and cooked dishes'}],[{it:'Al calice',en:'By the glass'},{it:'Sempre ben freddo',en:'Always properly cold'}]]}]},
vetrata:{k:{it:'La sera',en:'In the evening'},h:{it:'La vetrata, tra le palme.',en:'The pavilion, among the palms.'},p:{it:"Una struttura di vetro e legno sulla piazza, con il dehor tra palme, olivi e fiori. La sera si accende davanti al porticciolo.",en:"A glass and wood pavilion on the square, with a terrace among palms, olive trees and flowers. In the evening it lights up facing the harbour."},b:[
{t:'g',i:[['48',{it:'Il dehor sulla piazza',en:'The terrace on the square'}],['25',{it:'La vetrata',en:'The glass pavilion'}],['58',{it:'La sera, tra le piante',en:'Evening, among the plants'}],['62',{it:'Olivi e fiori',en:'Olive trees and flowers'}],['61',{it:'Tavoli all\'aperto',en:'Outdoor tables'}],['05',{it:'Sotto gli ombrelloni',en:'Under the umbrellas'}],['18',{it:'Un\'ostrica al sole',en:'An oyster in the sun'}]]},
{t:'list',r:[[{it:'Dentro',en:'Inside'},{it:'Sotto la vetrata, con il bancone',en:'Under the glass, with the counter'}],[{it:'Fuori',en:'Outside'},{it:'Il dehor tra palme e olivi',en:'The terrace among palms and olive trees'}],[{it:'Vista',en:'View'},{it:'Il porticciolo e il tramonto',en:'The harbour and the sunset'}]]}]},
tavolo:{k:{it:'Prenotazione via WhatsApp',en:'Booking via WhatsApp'},h:{it:'Il tuo tramonto.',en:'Your sunset.'},p:{it:"Scegli il giorno: la scena ti mostra il tramonto di quella sera. Ti proponiamo il tavolo mezz'ora prima.",en:"Pick the day: the scene shows you that evening's sunset. We suggest the table half an hour before."},b:[{t:'book'}]}
},
pairs:[['ostrica','03',{it:'Ostrica → Tartare di ostriche e mela',en:'Oyster → Oyster and apple tartare'}],['gambero','07',{it:'Gambero rosso → crudo',en:'Red prawn → raw'}],['tonno','68',{it:'Tonno rosso → in crosta di sesamo',en:'Bluefin tuna → sesame-crusted'}],['scampo','23',{it:'Pescato del giorno → crudi in barattolo',en:'Catch of the day → raw fish in jars'}]],
cats:[['all',{it:'Tutto',en:'All'}],['p',{it:'Pesce',en:'Fish'}],['m',{it:'Molluschi',en:'Molluscs'}],['c',{it:'Crostacei',en:'Crustaceans'}]],
species:[
{c:'p',f:'orata',n:['Orata','Gilthead bream'],s:'Sparus aurata',z:'FAO 37.2.1',m:['reti da posta','gillnets'],u:['al forno, al sale, crudo','baked, salt-crusted, raw']},
{c:'p',f:'triglia',n:['Triglia','Red mullet'],s:'Mullus barbatus',z:'FAO 37.2.1',m:['reti a strascico','trawls'],u:['fritta, al cartoccio','fried, en papillote']},
{c:'p',f:'ricciola',n:['Ricciola','Amberjack'],s:'Seriola dumerili',z:'FAO 37.2.1',m:['lenze e ami','hooks and lines'],u:['carpaccio, tranci alla griglia','carpaccio, grilled steaks']},
{c:'p',f:'scorfano',n:['Scorfano','Scorpionfish'],s:'Scorpaena scrofa',z:'FAO 37.2.1',m:['reti da posta','gillnets'],u:['zuppa, sugo per la pasta','soup, pasta sauce']},
{c:'p',f:'cernia',n:['Cernia','Dusky grouper'],s:'Epinephelus marginatus',z:'FAO 37.2.2',m:['palangari','longlines'],u:['al forno, in umido','baked, stewed']},
{c:'p',f:'alice',n:['Alici','Anchovies'],s:'Engraulis encrasicolus',z:'FAO 37.2.1',m:['reti da circuizione','purse seines'],u:['marinate, fritte, in tortiera','marinated, fried, baked']},
{c:'p',f:'spada',n:['Pesce spada','Swordfish'],s:'Xiphias gladius',z:'FAO 37.2.2',m:['palangari','longlines'],u:['carpaccio, involtini','carpaccio, rolls']},
{c:'p',f:'tonno',n:['Tonno rosso','Bluefin tuna'],s:'Thunnus thynnus',z:'FAO 37',m:['reti da circuizione','purse seines'],u:['tartare, scottato','tartare, seared']},
{c:'m',f:'polpo',n:['Polpo','Octopus'],s:'Octopus vulgaris',z:'FAO 37.2.1',m:['nasse','pots'],u:['crudo arricciato, alla brace','curled raw, grilled']},
{c:'m',f:'seppia',n:['Seppia','Cuttlefish'],s:'Sepia officinalis',z:'FAO 37.2.1',m:['nasse','pots'],u:['cruda, ripiena, al nero','raw, stuffed, in its ink']},
{c:'m',f:'calamaro',n:['Calamaro','Squid'],s:'Loligo vulgaris',z:'FAO 37.2.1',m:['lenze','jigs'],u:['crudo, fritto, alla griglia','raw, fried, grilled']},
{c:'m',f:'cozza',n:['Cozze','Mussels'],s:'Mytilus galloprovincialis',z:['Allevate · Italia','Farmed · Italy'],m:['allevamento','farmed'],u:['crude, impepata, nella pasta','raw, peppered, in pasta']},
{c:'m',f:'ostrica',n:['Ostriche','Oysters'],s:'Crassostrea gigas',z:['Allevate · Atlantico','Farmed · Atlantic'],m:['allevamento','farmed'],u:['crude, con limone','raw, with lemon']},
{c:'c',f:'gambero',n:['Gambero rosso','Red prawn'],s:'Aristaeomorpha foliacea',z:'FAO 37.2.2',m:['reti a strascico','trawls'],u:['crudo, al naturale','raw, plain']},
{c:'c',f:'scampo',n:['Scampo','Langoustine'],s:'Nephrops norvegicus',z:'FAO 37.2.1',m:['reti a strascico','trawls'],u:['crudo, alla griglia','raw, grilled']}
],
label:[['Nome','Name','Ricciola'],['Nome scientifico','Latin name','Seriola dumerili'],['Zona di cattura','Catch area','FAO 37.2.1 · Adriatico'],['Metodo','Method','lenze e ami|hooks and lines']],
menu:[
{g:["Ostriche e crostacei","Oysters and shellfish"]},
{n:["Ostriche","Oysters"],s:"Crassostrea gigas",o:["Allevata · Atlantico","Farmed · Atlantic"],p:["4 € cad.","4 € each"]},
{n:["Tartare di ostriche e mela","Oyster and apple tartare"],s:"Crassostrea gigas",o:["Crudo","Raw"],p:["18 €","18 €"]},
{n:["Gambero rosso","Red prawn"],s:"Aristaeomorpha foliacea",o:["FAO 37.2.2 · Ionio","FAO 37.2.2 · Ionian"],p:["7 € cad.","7 € each"]},
{n:["Scampo","Langoustine"],s:"Nephrops norvegicus",o:["FAO 37.2.1 · Adriatico","FAO 37.2.1 · Adriatic"],p:["8 € cad.","8 € each"]},
{g:["Tartare e carpacci","Tartare and carpaccio"]},
{n:["Tartare di tonno","Tuna tartare"],s:"Thunnus thynnus",o:["FAO 37 · Mediterraneo","FAO 37 · Mediterranean"],p:["22 €","22 €"]},
{n:["Tonno in crosta di sesamo","Sesame-crusted tuna"],s:"Thunnus thynnus",o:["Scottato","Seared"],p:["26 €","26 €"]},
{n:["Carpaccio di pesce spada alle erbe","Swordfish carpaccio with herbs"],s:"Xiphias gladius",o:["FAO 37 · Mediterraneo","FAO 37 · Mediterranean"],p:["18 €","18 €"]},
{g:["Dalla cucina","From the kitchen"]},
{n:["Polpo","Octopus"],s:"Octopus vulgaris",o:["FAO 37.2.1 · Adriatico","FAO 37.2.1 · Adriatic"],p:["20 €","20 €"]},
{n:["Crudi in barattolo","Raw fish in jars"],s:["secondo il pescato","from the catch"],o:["Tre assaggi del giorno","Three tastes of the day"],p:["24 €","24 €"]},
{n:["Farro con brodo di pesce","Spelt in fish broth"],s:["della casa","house recipe"],o:["Cotto","Cooked"],p:["18 €","18 €"]},
{n:["Primo di mare","Seafood pasta"],s:["secondo il pescato","from the catch"],o:["Cotto","Cooked"],p:["20 €","20 €"]},
{n:["Frittura di mare","Fried seafood"],s:["calamari, gamberi, alici","squid, prawns, anchovies"],o:["Fritto","Fried"],p:["22 €","22 €"]}
],
ui:{
it:{book:'Prenota',index:'Indice',now:'Torna ad adesso',hint:'Scorri per muovere il tempo',hint2:'oppure trascina la linea del giorno',rise:'alba',set:'tramonto',open1:'Aperto · banco',open2:'Aperto · crudoteca',closed:'Chiuso',close:'Chiudi',idx:'Tutti i cartellini, a qualsiasi ora',idxn:'Orari indicativi, da confermare',map:'Apri la mappa',l1:'Giorno',l2:'Persone',l3:'Orario',l4:'Nome',send:'Invia la richiesta su WhatsApp',alt:'Oppure chiamate il',sunset:'Al tramonto',sunline:'Quel giorno il sole tramonta alle',cred:'Foto degli ospiti da Google, solo per questa anteprima · Incisioni di pubblico dominio da Wikimedia Commons (Bloch, Krüger, Dautzenberg, EB1911, FMIB e altri) · Anteprima di SelfManager',hrs:'Tutti i giorni 09:00–24:00',lang:'English version',always:'sempre',spk:'Esempi · secondo stagione e pescato',labels:'Cartellini',hintm:'Scorri su e giù per muovere il tempo',hint2m:'Tocca un cartellino per aprirlo',zone:'Zona',meth:'Metodo',use:'In cucina'},
en:{book:'Book',index:'Index',now:'Back to now',hint:'Scroll to move time',hint2:'or drag the line of the day',rise:'sunrise',set:'sunset',open1:'Open · fish counter',open2:'Open · raw bar',closed:'Closed',close:'Close',idx:'All the labels, at any time',idxn:'Indicative hours, to be confirmed',map:'Open the map',l1:'Day',l2:'Guests',l3:'Time',l4:'Name',send:'Send the request on WhatsApp',alt:'Or call',sunset:'At sunset',sunline:'That day the sun sets at',cred:'Guest photos from Google, for this preview only · Public-domain engravings from Wikimedia Commons (Bloch, Krüger, Dautzenberg, EB1911, FMIB and others) · Preview by SelfManager',hrs:'Every day 09:00–24:00',lang:'Versione italiana',always:'always',spk:'Examples · depending on season and catch',labels:'Labels',hintm:'Swipe up and down to move time',hint2m:'Tap a label to open it',zone:'Area',meth:'Method',use:'To cook'}
}};
