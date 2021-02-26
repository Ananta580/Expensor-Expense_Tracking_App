package com.ananta.expensor;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import android.content.IntentSender;
import com.google.android.play.core.appupdate.AppUpdateInfo;
import com.google.android.play.core.appupdate.AppUpdateManager;
import com.google.android.play.core.appupdate.AppUpdateManagerFactory;
import com.google.android.play.core.install.model.AppUpdateType;
import com.google.android.play.core.install.model.UpdateAvailability;
import com.google.android.play.core.tasks.OnSuccessListener;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  AppUpdateManager appUpdateManager;
  int RequestUpdate = 1;
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    //use this anywhere in your start screen activity, like after sign in activity
    appUpdateManager = AppUpdateManagerFactory.create(MainActivity.this);
    appUpdateManager.getAppUpdateInfo().addOnSuccessListener(new OnSuccessListener<AppUpdateInfo>() {
      @Override
      public void onSuccess(AppUpdateInfo result) {
        if((result.updateAvailability() == UpdateAvailability.UPDATE_AVAILABLE)
                && result.isUpdateTypeAllowed(AppUpdateType.IMMEDIATE))
        {
          try {
            appUpdateManager.startUpdateFlowForResult(
                    result,
                    AppUpdateType.IMMEDIATE,
                    MainActivity.this,
                    RequestUpdate);
          }
          catch (IntentSender.SendIntentException e)
          {
            e.printStackTrace();
          }
        }
      }
    });

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
    }});

  }

  @Override
  public void onResume() {
    super.onResume();
    appUpdateManager.getAppUpdateInfo().addOnSuccessListener(new OnSuccessListener<AppUpdateInfo>() {
      @Override
      public void onSuccess(AppUpdateInfo result) {
        if(result.updateAvailability() == UpdateAvailability.DEVELOPER_TRIGGERED_UPDATE_IN_PROGRESS)
        {
          try {
            appUpdateManager.startUpdateFlowForResult(
                    result,
                    AppUpdateType.IMMEDIATE,
                    MainActivity.this,
                    RequestUpdate);
          }
          catch (IntentSender.SendIntentException e)
          {
            e.printStackTrace();
          }
        }
        //else{
          //System.exit(1);
        //}
      }
    });
  }

}
