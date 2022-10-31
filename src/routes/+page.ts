// Copyright (c) 2022 Helio Chissini de Castro
//
// This program and the accompanying materials are made
// available under the terms of the Eclipse Public License 2.0
// which is available at https://www.eclipse.org/legal/epl-2.0/
//
// SPDX-License-Identifier: EPL-2.0 -->

import { redirect } from "@sveltejs/kit";

export async function load({ session }) {
    if (!session.user) {
        throw redirect(302, '/login');
    }

    return {};
}