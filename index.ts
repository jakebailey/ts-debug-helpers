/**
 * To use when debugging TS, run or add as a watch expression: `require("/path/to/ts-debug-helpers")(ts)`
 */

import type { Node, Scanner } from 'byots';

function isTs(ts: any): ts is typeof import('byots') {
    return typeof ts?.createPrinter === 'function';
}

declare global {
    // eslint-disable-next-line no-var
    var __loaded: boolean | undefined;
}

module.exports = (ts: unknown) => {
    if (globalThis.__loaded) {
        return;
    }

    if (!isTs(ts)) {
        throw new Error('parameter is not typescript');
    }

    const fns = {
        __loaded: true,
        __nodeEmit(node: Node) {
            const sourceFile = ts.getSourceFileOfNode(node);
            return ts.createPrinter({}).printNode(ts.EmitHint.Unspecified, node, sourceFile);
        },
        __nodeText(node: Node) {
            const sourceFile = ts.getSourceFileOfNode(node);
            return sourceFile.text.slice(node.pos, node.end);
        },
        __nodeCommentText(node: Node) {
            const sourceFile = ts.getSourceFileOfNode(node);
            const commentRange = ts.getCommentRange(node);
            return sourceFile.text.slice(commentRange.pos, commentRange.end);
        },
        __scannerText(scanner: Scanner) {
            return scanner.getText().slice(scanner.getStartPos());
        },
    };

    Object.assign(globalThis, fns);
};
