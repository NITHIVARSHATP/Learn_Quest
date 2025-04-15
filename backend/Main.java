import java.util.Scanner;

public class Main {  // This class should be named Main
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Read input
        int num = sc.nextInt();
        
        // Logic for solving the problem
        if (num % 2 == 0) {
            System.out.println("Even");
        } else {
            System.out.println("Odd");
        }
        
        sc.close();
    }
}
