package com.adds.aiwealthmanager

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.adds.aiwealthmanager.ui.theme.DeepGreen
import com.adds.aiwealthmanager.ui.theme.poppinsFontFamily

@Composable
fun NotificationPage(navController: NavController) {
    MaterialTheme {
        Surface(color = DeepGreen,
            modifier = Modifier.fillMaxSize()) {
            Column {
                Row(modifier = Modifier
                    .padding(10.dp)
                    .fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically) {
                    BackButton { navController.navigate("homepage") }

                    Text(text = "Notifications",
                        color = Color.White,
                        fontFamily = poppinsFontFamily,
                        fontSize = 22.sp,
                        fontWeight = FontWeight.Bold
                    )

                    UserButton { navController.navigate("profile") }
                }
            }
        }
    }
}

@Preview
@Composable
fun NotificationPageDemo() {
    NotificationPage(navController = rememberNavController())
}
