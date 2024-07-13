package com.adds.aiwealthmanager

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.adds.aiwealthmanager.ui.theme.DeepGreen
import com.adds.aiwealthmanager.ui.theme.LightBlue
import com.adds.aiwealthmanager.ui.theme.Star2
import com.adds.aiwealthmanager.ui.theme.poppinsFontFamily

@Composable
fun ProfilePage(navController: NavController) {
    MaterialTheme {
        Surface(color = DeepGreen,
            modifier = Modifier.fillMaxSize()) {

            Star2()

            Column(modifier = Modifier.padding(10.dp),
                horizontalAlignment = Alignment.CenterHorizontally) {
                Spacer(modifier = Modifier.height(10.dp))
                Row(
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    BackButton { navController.popBackStack() }

                    Text(
                        text = "Profile",
                        color = LightBlue,
                        fontFamily = poppinsFontFamily,
                        fontWeight = FontWeight.Bold,
                        fontSize = 32.sp,
                        modifier = Modifier.weight(1f),
                        textAlign = TextAlign.Center
                    )

                    MenuButton { }
                }

                Spacer(modifier = Modifier.height(30.dp))

                Column(modifier = Modifier.fillMaxWidth()
                    .padding(20.dp)) {
                    Spacer(modifier = Modifier.height(150.dp))

                    Text(text = "Username",
                        color = Color.White,
                        fontFamily = poppinsFontFamily,
                        fontWeight = FontWeight.Normal,
                        fontSize = 14.sp)

                    Spacer(modifier = Modifier.height(50.dp))

                    Text(text = "Phone Number",
                        color = Color.White,
                        fontFamily = poppinsFontFamily,
                        fontWeight = FontWeight.Normal,
                        fontSize = 14.sp)

                    Spacer(modifier = Modifier.height(50.dp))

                    Text(text = "Email",
                        color = Color.White,
                        fontFamily = poppinsFontFamily,
                        fontWeight = FontWeight.Normal,
                        fontSize = 14.sp)

                    Spacer(modifier = Modifier.height(50.dp))

                    Text(text = "Budget",
                        color = Color.White,
                        fontFamily = poppinsFontFamily,
                        fontWeight = FontWeight.Normal,
                        fontSize = 14.sp)
                }

                Spacer(modifier = Modifier.height(80.dp))

                Button(onClick = { /*TODO*/ }) {
                    Text(text = "Edit Profile",
                        fontFamily = poppinsFontFamily,
                        fontWeight = FontWeight.Bold,
                        fontSize = 24.sp,)
                }
            }
        }
    }
}

@Preview
@Composable
fun ProfilePageDemo() {
    ProfilePage(navController = rememberNavController())
}


