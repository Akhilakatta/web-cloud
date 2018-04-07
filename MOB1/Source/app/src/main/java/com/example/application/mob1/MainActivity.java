package com.example.application.mob1;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    DatabaseHelper helper = new DatabaseHelper(this);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(com.example.application.mob1.R.layout.activity_main);

    }


    public void onLogin(View v)
    {
        EditText a = (EditText)findViewById(com.example.application.mob1.R.id.username);
        String str = a.getText().toString();

        EditText b = (EditText)findViewById(com.example.application.mob1.R.id.password);
        String pass = b.getText().toString();

        String password = helper.searchPass(str);

        if (pass.equals(password))
        {
            Intent i = new Intent(MainActivity.this,Home.class);

            startActivity(i);
        }

        else
        {
            Toast tem = Toast.makeText(MainActivity.this,"Username and password does'nt match ", Toast.LENGTH_SHORT);
            tem.show();
        }

      private static final String EMAIL = "email";

    loginButton = (LoginButton) findViewById(R.id.login_button);
    loginButton.setReadPermissions(Arrays.asList(EMAIL));

        loginButton.registerCallback(callbackManager, new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(LoginResult loginResult) {
                // App code
            }

            @Override
            public void onCancel() {
                // App code
            }

            @Override
            public void onError(FacebookException exception) {
                // App code
            }
        });
    }
    }



}
