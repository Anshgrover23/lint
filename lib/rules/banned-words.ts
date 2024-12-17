import type { Rule } from "eslint"

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow generic words like 'data', 'info', 'value', 'param' in favor of more specific terms",
    },
    fixable: "code",
    schema: [], // no options
    messages: {
      avoidGeneric:
        "Avoid using generic term '{{ word }}'. Use a more descriptive name.",
    },
  },
  create: function (context: Rule.RuleContext) {
    const BANNED_WORDS = ["data", "info", "value", "param"].sort()

    function checkForBannedWords(node: any) {
      const name = node.name
      BANNED_WORDS.forEach((word) => {
        if (name.toLowerCase().includes(word.toLowerCase())) {
          context.report({
            node,
            message: `Avoid using generic term '${word}'. Use a more specific, domain-relevant name instead. Example: 'cartData' -> 'currentOrderDetails'`,
          })
        }
      })
    }

    return {
      Identifier: checkForBannedWords,
    }
  },
}

export default rule

// module.exports = {
//     meta: {
//         type: "problem",
//         docs: {
//             description: "Disallow generic words like 'data', 'info', 'value', 'param' in favor of more specific terms",
//         },
//         fixable: null,
//         schema: [] // no options
//     },
//     create: function(context) {
//         const BANNED_WORDS = ['data', 'info', 'value', 'param'];

//         function checkForBannedWords(node) {
//             const name = node.name;
//             const bannedWord = BANNED_WORDS.find(word =>
//                 name.toLowerCase().includes(word.toLowerCase())
//             );

//             if (bannedWord) {
//                 context.report({
//                     node,
//                     message: `Avoid using generic term '${bannedWord}'. Use a more specific, domain-relevant name instead. Example: 'cartData' -> 'currentOrderDetails'`
//                 });
//             }
//         }

//         return {
//             Identifier: checkForBannedWords,
//             VariableDeclarator(node) {
//                 if (node.id.type === 'Identifier') {
//                     checkForBannedWords(node.id);
//                 }
//             }
//         };
//     }
// };
