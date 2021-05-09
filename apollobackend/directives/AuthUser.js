import apollo from 'apollo-server';
const  { AuthenticationError,SchemaDirectiveVisitor } = apollo;
import gql from 'graphql';
const { defaultFieldResolver } = gql

// Create (or import) a custom schema directive
export class isAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
        const context = args[2];

        if(!context.me){
            throw new AuthenticationError('Unauthenticated User.')
        }
      const result = await resolve.apply(this, args);
      return result;
    };
  }
}

// export class UpperCaseDirective extends SchemaDirectiveVisitor {
//   visitFieldDefinition(field) {
//     const { resolve = defaultFieldResolver } = field;
//     field.resolve = async function (...args) {
//       const result = await resolve.apply(this, args);
//       if (typeof result === 'string') {
//         return result.toUpperCase();
//       }
//       return result;
//     };
//   }
// }