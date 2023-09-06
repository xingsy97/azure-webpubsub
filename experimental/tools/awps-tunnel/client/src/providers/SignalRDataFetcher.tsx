import { ConnectionStatus, LogLevel, HttpHistoryItem, DataModel } from "./models";
import { IDataFetcher } from "./IDataFetcher";
import * as signalR from "@microsoft/signalr";
function loadTrafficHistory() {
  const trafficHistory = localStorage.getItem("trafficHistory");
  if (trafficHistory) {
    return JSON.parse(trafficHistory);
  }
  return [];
}
function updateTrafficHistory(items: HttpHistoryItem[]) {
  localStorage.setItem("trafficHistory", JSON.stringify(items));
}

export class SignalRDataFetcher implements IDataFetcher {
  // load data from local storage
  public model: DataModel = {
    ready: false,
    endpoint: "",
    hub: "",
    clientUrl: "",
    liveTraceUrl: "",
    upstreamServerUrl: "",
    tunnelConnectionStatus: ConnectionStatus.Connecting,
    tunnelServerStatus: {
      statusIn: ConnectionStatus.Disconnected,
      statusOut: ConnectionStatus.Disconnected,
    },
    trafficHistory: loadTrafficHistory(),
    logs: [],
  };

  constructor(private onModelUpdate: (model: DataModel) => void) {
    this._startConnection();
  }

  async _startConnection() {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("/dataHub")
      .withAutomaticReconnect()
      .build();

    newConnection.on("UpdateLogs", (logs) => {
      console.log(logs);
      this.model.logs = [...this.model.logs, ...logs];
      this.onModelUpdate(this.model);
    });

    newConnection.on("ReportLiveTraceUrl", (url) => {
      console.log(url);
      this.model.liveTraceUrl = url;
      this.onModelUpdate(this.model);
    });

    newConnection.on("ReportServiceEndpoint", (url) => {
      console.log(url);
      this.model.endpoint = url;
    });
    newConnection.on("ReportLocalServerUrl", (url) => {
      console.log(url);
      this.model.upstreamServerUrl = url;
      this.onModelUpdate(this.model);
    });
    newConnection.on("ReportStatusChange", (status) => {
      console.log(status);
      this.model.tunnelConnectionStatus = status;
      this.onModelUpdate(this.model);
    });
    newConnection.on("ReportTunnelToLocalServerStatus", (status) => {
      console.log(status);
      this.model.tunnelServerStatus = status;
      this.onModelUpdate(this.model);
    });
    newConnection.on("UpdateTraffics", (items) => {
      console.log(items);
      // only takes 50 items;
      const currentItems = [...items, ...this.model.trafficHistory].slice(0, 50);
      updateTrafficHistory(currentItems);
      this.model.trafficHistory = currentItems;
      this.onModelUpdate(this.model);
    });

    console.log("SignalR connection established.");
    try {
      await newConnection.start();
    } catch (err) {
      console.log("SignalR connection failed: " + err);
    }
    const serverModel = await newConnection.invoke("GetCurrentModel");
    setInterval(async () => {
      this.model.clientUrl = await newConnection.invoke("GetClientAccessUrl");
      this.onModelUpdate(this.model);
    }, 10 * 1000);
    this.model = {
      ...this.model,
      logs: serverModel.logs,
      ...serverModel.state,
      ready: true,
    };
    this.onModelUpdate(this.model);
  }
}