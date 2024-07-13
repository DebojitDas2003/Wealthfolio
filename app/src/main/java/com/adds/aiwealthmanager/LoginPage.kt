package com.adds.aiwealthmanager


import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.adds.aiwealthmanager.ui.theme.DarkBlue
import com.adds.aiwealthmanager.ui.theme.DeepGreen
import com.adds.aiwealthmanager.ui.theme.LightBlue
import com.adds.aiwealthmanager.ui.theme.Magentish
import com.adds.aiwealthmanager.ui.theme.Star2
import com.adds.aiwealthmanager.ui.theme.poppinsFontFamily

@Composable
fun LoginPage() {
    val userName = remember { mutableStateOf("") }
    val password = remember { mutableStateOf("") }




    MaterialTheme{
        Surface(color = DeepGreen,
            modifier = Modifier.fillMaxSize()) {
            Star2()

            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center,
                modifier = Modifier.padding(16.dp)
            ) {

                Image(painter = painterResource(id = R.drawable.login),
                    contentDescription = "login",
                    modifier = Modifier.size(100.dp))

                Text(
                    text = "Login",
                    color = LightBlue,
                    fontFamily = poppinsFontFamily,
                    fontWeight = FontWeight.Bold,
                    fontSize = 32.sp
                )

                Spacer(modifier = Modifier.height(24.dp))

                OutlinedTextField(
                    value = userName.value,
                    onValueChange = { userName.value = it },
                    label = { Text("Username",
                        color = Color.White) },
                    modifier = Modifier.fillMaxWidth()
                )

                Spacer(modifier = Modifier.height(16.dp))

                OutlinedTextField(
                    value = password.value,
                    onValueChange = { password.value = it },
                    label = { Text("Password",
                        color = Color.White) },
                    modifier = Modifier.fillMaxWidth()
                )

                Spacer(modifier = Modifier.height(16.dp))

                TextButton(onClick = { /*TODO*/ }) {
                    Text(text = "Forgot Password?",
                        color = Magentish,
                        fontFamily = poppinsFontFamily,
                        fontWeight = FontWeight.Bold,
                        fontSize = 15.sp)
                }

                Spacer(modifier = Modifier.height(16.dp))

                Row(horizontalArrangement = Arrangement.Center,
                    verticalAlignment = Alignment.CenterVertically) {
                    Text(text = "Don't have an account?",
                        color = Color.White,
                        fontFamily = poppinsFontFamily,
                        fontWeight = FontWeight.Bold,
                        fontSize = 15.sp)

                    TextButton(onClick = { /*TODO*/ }) {
                        Text(text = "Sign Up",
                            color = DarkBlue,
                            fontFamily = poppinsFontFamily,
                            fontWeight = FontWeight.Bold,
                            fontSize = 15.sp)
                    }
                }


                Spacer(modifier = Modifier.height(16.dp))

                Button(onClick = { /* Handle sign-up logic here */ }) {
                    Text("Login",
                        color = Color.White,
                        fontFamily = poppinsFontFamily,
                        fontWeight = FontWeight.Bold,
                        fontSize = 15.sp)
                }


            }

        }
    }
}



@Preview
@Composable
fun LoginPageDemo() {
    LoginPage()
}