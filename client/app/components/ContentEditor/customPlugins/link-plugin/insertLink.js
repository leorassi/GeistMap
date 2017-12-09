import React from 'react';
import { Entity, RichUtils } from 'draft-js';

import { getSelectionEntity } from '../../utils/inline.js'

export function insertLink(editorState) {
    const contentState = editorState.getCurrentContent()
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
        return;
    }

    const active = isActive(editorState)
    
    if (active) {
        return RichUtils.toggleLink(editorState, selection, null)
    } else {
        // TODO: use a DOM element instead - 2016-06-28
        const href = window.prompt('Enter a URL'); // eslint-disable-line no-alert

        if (!href) return;

        const newContentState = contentState.createEntity('LINK', 'MUTABLE', { href });
        const newEditorState = EditorState.push(editorState, newContentState, 'apply-entity')

        return RichUtils.toggleLink(newEditorState, selection, newContentState.getLastCreatedEntityKey())
    }
}

export function isActive(editorState) {

    const selection = editorState.getSelection();
    const startBlock = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey());

    const called = false

    // TODO: write a helper method for this - 2016-09-23
    return getSelectionEntity(editorState)
}

