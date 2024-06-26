/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/

import { type WebPubSubResource } from "@azure/arm-webpubsub";
import { KnownServiceKind } from "@azure/arm-webpubsub";
import { getResourceGroupFromId, uiUtils } from "@microsoft/vscode-azext-azureutils";
import { type IActionContext, type TreeElementBase} from "@microsoft/vscode-azext-utils";
import { createContextValue } from "@microsoft/vscode-azext-utils";
import { type AzureResource, type AzureResourceModel, type AzureSubscription, type ViewPropertiesModel } from '@microsoft/vscode-azureresources-api';
import * as vscode from 'vscode';
import { createWebPubSubAPIClient } from "../../utils";
import { getServiceIconPath } from "../utils";
import { ServicePropertiesItem } from "./ServicePropertiesItem";
import { type ServiceModel } from "./ServiceModel";
import { HubSettingsItem } from "../hubSettings/HubSettingsItem";

export class ServiceItem implements AzureResourceModel {
    static readonly contextValue: string = 'webPubSubServiceItem';
    static readonly contextValueRegExp: RegExp = new RegExp(ServiceItem.contextValue);

    id: string;
    resourceGroup: string;
    name: string;
    hubs: HubSettingsItem;
    properties: ServicePropertiesItem;

    constructor(public readonly subscription: AzureSubscription, public readonly resource: AzureResource, public readonly service: ServiceModel) {
        this.id = service.id;
        this.name = service.name;
        this.resourceGroup = service.resourceGroup;
        this.properties = new ServicePropertiesItem(this.service);
        this.hubs = new HubSettingsItem(this);
    }

    async getChildren(): Promise<TreeElementBase[]> {
        return [this.properties, this.hubs];
    }

    getTreeItem(): vscode.TreeItem {
        return {
            label: this.service.name,
            id: this.id,
            iconPath: getServiceIconPath(this.service.kind !== KnownServiceKind.SocketIO),
            contextValue: createContextValue([ServiceItem.contextValue]),
            collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
            tooltip: `${this.service.name}, ${this.service.sku?.tier} ${this.service.sku?.capacity} units, ${this.service.location}`,
        };
    }

    viewProperties: ViewPropertiesModel = {
        data: this.service,
        label: `Properties`
    };

    static async list(context: IActionContext, subscription: AzureSubscription): Promise<WebPubSubResource[]> {
        const client = await createWebPubSubAPIClient(context, subscription);
        return await uiUtils.listAllIterator(client.webPubSub.listBySubscription());
    }

    static async get(context: IActionContext, subscription: AzureSubscription, resourceGroup: string, name: string): Promise<ServiceModel> {
        const client = await createWebPubSubAPIClient(context, subscription);
        return ServiceItem.createWebPubSubModel(await client.webPubSub.get(resourceGroup, name), name);
    }

    static createWebPubSubModel(serviceResource: WebPubSubResource, serviceName: string): ServiceModel {
        if (!serviceResource.id) {
            throw new Error(`Invalid webPubSub.id: ${serviceResource.id}`);
        }
        return {
            name: serviceName,
            resourceGroup: getResourceGroupFromId(serviceResource.id),
            id: serviceResource.id,
            ...serviceResource
        }
    }
}
