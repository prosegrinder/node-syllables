const sub_syllables = [
  "cial",
  "tia",
  "cius",
  "cious",
  "uiet",
  "gious",
  "geous",
  "priest",
  "giu",
  "dge",
  "ion",
  "iou",
  "sia$",
  ".che$",
  ".ched$",
  ".abe$",
  ".ace$",
  ".ade$",
  ".age$",
  ".aged$",
  ".ake$",
  ".ale$",
  ".aled$",
  ".ales$",
  ".ane$",
  ".ame$",
  ".ape$",
  ".are$",
  ".ase$",
  ".ashed$",
  ".asque$",
  ".ate$",
  ".ave$",
  ".azed$",
  ".awe$",
  ".aze$",
  ".aped$",
  ".athe$",
  ".athes$",
  ".ece$",
  ".ese$",
  ".esque$",
  ".esques$",
  ".eze$",
  ".gue$",
  ".ibe$",
  ".ice$",
  ".ide$",
  ".ife$",
  ".ike$",
  ".ile$",
  ".ime$",
  ".ine$",
  ".ipe$",
  ".iped$",
  ".ire$",
  ".ise$",
  ".ished$",
  ".ite$",
  ".ive$",
  ".ize$",
  ".obe$",
  ".ode$",
  ".oke$",
  ".ole$",
  ".ome$",
  ".one$",
  ".ope$",
  ".oque$",
  ".ore$",
  ".ose$",
  ".osque$",
  ".osques$",
  ".ote$",
  ".ove$",
  ".pped$",
  ".sse$",
  ".ssed$",
  ".ste$",
  ".ube$",
  ".uce$",
  ".ude$",
  ".uge$",
  ".uke$",
  ".ule$",
  ".ules$",
  ".uled$",
  ".ume$",
  ".une$",
  ".upe$",
  ".ure$",
  ".use$",
  ".ushed$",
  ".ute$",
  ".ved$",
  ".we$",
  ".wes$",
  ".wed$",
  ".yse$",
  ".yze$",
  ".rse$",
  ".red$",
  ".rce$",
  ".rde$",
  ".ily$",
  ".ely$",
  ".des$",
  ".gged$",
  ".kes$",
  ".ced$",
  ".ked$",
  ".med$",
  ".mes$",
  ".ned$",
  ".[sz]ed$",
  ".nce$",
  ".rles$",
  ".nes$",
  ".pes$",
  ".tes$",
  ".res$",
  ".ves$",
  "ere$",
];

const add_syllables = [
  "ia",
  "riet",
  "dien",
  "ien",
  "iet",
  "iu",
  "iest",
  "io",
  "ii",
  "ily",
  ".oala$",
  ".iara$",
  ".ying$",
  ".earest",
  ".arer",
  ".aress",
  ".eate$",
  ".eation$",
  "[aeiouym]bl$",
  "[aeiou]{3}",
  "^mc",
  "ism",
  "^mc",
  "asm",
  "([^aeiouy])1l$",
  "[^l]lien",
  "^coa[dglx].",
  "[^gq]ua[^auieo]",
  "dnt$",
];

const re_sub_syllables: Array<RegExp> = [];
sub_syllables.forEach((sub) => {
  re_sub_syllables.push(new RegExp(sub, "i"));
});

const re_add_syllables: Array<RegExp> = [];
add_syllables.forEach((add) => {
  re_add_syllables.push(new RegExp(add, "i"));
});

export function estimate_syllables(word: string): number {
  word = word.toLowerCase().trim();
  if (word.length <= 3) {
    return 1;
  }
  const parts = word.split(/[^aeiouy]+/);
  const valid_parts: string[] = [];
  parts.forEach((part) => {
    if (part !== "") {
      valid_parts.push(part);
    }
  });

  parts.forEach((part, index) => {
    if (part === "") {
      parts.splice(index, 1);
    }
  });

  let syllables = 0;

  re_sub_syllables.forEach((sub) => {
    if (sub.test(word)) {
      syllables--;
    }
  });

  re_add_syllables.forEach((add) => {
    if (add.test(word)) {
      syllables++;
    }
  });

  syllables += valid_parts.length;

  if (syllables <= 0) {
    syllables = 1;
  }

  return syllables;
}
