//https://pastebin.com/vq7WfpUi

#include <iostream>
#include <vector>
#include <string>
#include <thread>
#include <random>
#include <cmath>

#include <cstdlib>
#include <iomanip>

double average(const std::vector<double> &arr)
{
	//Returns average of a vector
	double total = 0;

	for (int i = 0; i < arr.size(); i++)
	{
		total += arr[i];
       //Summing up the numbers
	}

	return total / arr.size();
	  //Divide to find average
}

//^_^//

bool istriangle(int n)
{
	//By knowing how a triangle number is made we can implement it to check if a number is triangle
	for (long long i = 1; i <= n; i++)
	{
		if (i * (i + 1) == 2 * n)
		{
			return true;
		}
	}
	return false;
}

//(°O°)//

unsigned long long factorial(const unsigned long long n) //factorial max 25? Reason: factorials >5 always end in zeros.
{
	//"unsigned long longdm" for very large numbers as factorial grows exponentially.
	if (n < 0)
	{
		std::cout << "Mathf::factorial - cannot factorial a negative number";
		return 0;
	}
	else if (n == 0)
		return 1;
	else
	{
		unsigned long long l = 1;

		for (int i = 1; i <= n; ++i)
		{
			l *= i;
		}

		return l;
	}
}

// namespace mathf

int randomInt(int minimum, int maximum)
{
	return ((std::rand() % abs(minimum - maximum)) + minimum);
}

//https://youtu.be/dQw4w9WgXcQ

std::vector<int> factorInt(int num)
{
	std::vector<int> factors;

	int sqrtNum = std::ceil(std::sqrt(num)); //Find squareroot of the number

	for (int i = 0; i <= sqrtNum; i++)
	{
		if (num % i == 0)
		{
			factors.push_back(num / i);
			factors.push_back(num / (num / i));
		};
	};
	return factors;
}

//٩(･ิᴗ･ิ๑)۶٩(･ิᴗ･ิ๑)۶//

std::vector<int> primeFactorsProduct(int num)
{
	std::vector<int> primeFactors;

	for (int i = 2; i <= num; ++i)
	{
		while (num % i == 0)
		{
			primeFactors.push_back(i);
			num /= i;
		}
	}

	if (num > 1)
	{
		primeFactors.push_back(num);
	}

	return primeFactors;
}

//＼(＾O＾)／//

int nCr(int n, int r)
{
	return factorial(n) / (factorial(r) * factorial(n - r));
}

//(≧∇≦)//

int nPr(int n, int r)
{
	return factorial(n) / factorial((n - r));
}

int main(){
	int x;
	std::cout << "Enter a number:";
	std::cin >> x;
    std::vector<int> list;
    list = primeFactorsProduct(x);
    for (int i:list){
    std::cout << i;
    std::cout << '\n';}
	return 0;
}